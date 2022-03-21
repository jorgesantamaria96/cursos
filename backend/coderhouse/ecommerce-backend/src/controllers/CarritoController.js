import validator from "validator";

import { carritosDao } from "../daos/index.js";

let idCarrito = 0;

export const errorResponse = (error, req, res) => {
  return res.status(404).json({
    success: false,
    error: error.message,
  });
};

export const createCarrito = async (req, res, next) => {
  try {
    idCarrito++;

    const carrito = {
      id: idCarrito,
      timestamp: Date.now(),
      products: [],
    };

    await carritosDao.save(carrito);

    return res.status(201).json({
      success: true,
      carrito: carrito.id,
    });
  } catch (error) {
    errorResponse(error, req, res);
  }
};

export const getProductsByCarrito = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const carrito = await carritosDao.getById(id);

    if (carrito) {
      return res.status(200).json({
        success: true,
        products: carrito.products,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "El carrito solicitado no existe.",
        url: `api/carrito/${id}/productos`,
      });
    }
  } catch (error) {
    errorResponse(error);
  }
};

export const deleteCarrito = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const carrito = await carritosDao.getById(id);

    if (carrito) {
      await carritosDao.deleteById(id);

      const data = await carritosDao.getAll();

      return res.status(204).json({
        success: true,
        message: "Carrito was deleted correctly",
        data,
      });
    } else {
    }
  } catch (error) {
    errorResponse(error);
  }
};

export const createProductByCarrito = async (req, res, next) => {
  const carritoId = Number(req.params.id);

  try {
    const carrito = await carritosDao.getById(carritoId);

    if (carrito) {
      const productIsValid =
        !validator.default.isEmpty(req.body.name) &&
        !validator.default.isEmpty(req.body.description) &&
        !validator.default.isEmpty(req.body.code) &&
        !validator.default.isEmpty(req.body.price) &&
        !validator.default.isEmpty(req.body.stock) &&
        !validator.default.isEmpty(req.body.thumbnail);

      if (productIsValid) {
        let newProductId = 1;
        if (carrito.products.length > 0) {
          newProductId = carrito.products[carrito.products.length - 1].id + 1;
        }

        const newProduct = {
          id: newProductId,
          name: req.body.name,
          description: req.body.description,
          code: req.body.code,
          price: req.body.price,
          stock: req.body.stock,
          thumbnail: req.body.thumbnail,
          timestamp: Date.now(),
        };

        carrito.products = [...carrito.products, newProduct];

        await carritosDao.editById(carritoId, carrito);

        return res.status(201).json({
          success: true,
          message: "Product was created",
          carrito: carrito,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Ingrese los datos correctamente.",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        error: "No existe el carrito al cuál agregarle un producto.",
      });
    }
  } catch (error) {
    errorResponse(error, req, res);
  }
};

export const deleteProduct = async (req, res, next) => {
  const carritoId = Number(req.params.id);
  const productId = Number(req.params.id_prod);

  try {
    if (carritoId && productId) {
      const carrito = await carritosDao.getById(carritoId);

      if (carrito) {
        const newProducts = carrito.products.filter(
          (prod) => prod.id !== productId
        );

        if (carrito.products.length !== newProducts.length) {
          const newCarrito = {
            id: carrito.id,
            timestamp: carrito.timestamp,
            products: newProducts,
          };

          await carritosDao.editById(carritoId, newCarrito);

          const data = await carritosDao.getAll();

          return res.status(200).json({
            success: true,
            message: "Producto eliminado exitosamente",
            data: data,
          });
        } else {
          return res.status(500).json({
            success: false,
            error: "El producto que estás solicitando borrar no existe.",
          });
        }
      } else {
        return res.status(500).json({
          success: false,
          error: "El carrito que estás solicitando no existe.",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        error: "La ruta solicitada no existe",
      });
    }
  } catch (error) {
    errorResponse(error, req, res);
  }
};
