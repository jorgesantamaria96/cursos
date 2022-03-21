import validator from "validator";

import { productosDao } from "../daos/index.js";

export const errorResponse = (error, req, res) => {
  return res.status(404).json({
    success: false,
    error: error.message,
  });
};

export const getProducts = async (req, res, next) => {
  const id =
    typeof req.params.id === "string"
      ? req.params.id
      : Number(req.params.id);

  if (id) {
    try {
      const product = await productosDao.getById(id);

      if (product) {
        return res.status(200).json({
          success: true,
          data: product,
        });
      } else {
        return res.status(404).json({
          success: false,
          error: "Product doesn't exists",
        });
      }
    } catch (error) {
      errorResponse(error, req, res);
    }
  } else {
    try {
      const products = await productosDao.getAll();

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      errorResponse(error, req, res);
    }
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const productIsValid =
      !validator.default.isEmpty(req.body.name) &&
      !validator.default.isEmpty(req.body.description) &&
      !validator.default.isEmpty(req.body.code) &&
      !validator.default.isEmpty(req.body.price) &&
      !validator.default.isEmpty(req.body.stock) &&
      !validator.default.isEmpty(req.body.thumbnail);

    if (productIsValid) {
      await productosDao.save({
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        stock: req.body.stock,
        thumbnail: req.body.thumbnail,
        timestamp: Date.now().toLocaleString(),
      });

      const products = await productosDao.getAll();

      return res.status(201).json({
        success: true,
        message: "Product was created",
        product: products[products.length - 1],
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Ingrese los datos correctamente.",
      });
    }
  } catch (error) {
    errorResponse(error, req, res);
  }
};

export const updateProduct = async (req, res, next) => {
  const id = Number(req.params.id);

  const product = await productosDao.getById(id);

  if (product) {
    const productIsValid =
      !validator.default.isEmpty(req.body.name) &&
      !validator.default.isEmpty(req.body.description) &&
      !validator.default.isEmpty(req.body.code) &&
      !validator.default.isEmpty(req.body.price) &&
      !validator.default.isEmpty(req.body.stock) &&
      !validator.default.isEmpty(req.body.thumbnail);

    if (productIsValid) {
      const newObj = {
        id: id,
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        stock: req.body.stock,
        thumbnail: req.body.thumbnail,
        timestamp: Date.now().toLocaleString(),
      };
      try {
        await productosDao.editById(id, newObj);

        const product = await productosDao.getById(id);
        console.log(product);
        return res.status(200).json({
          success: true,
          product,
        });
      } catch (error) {
        errorResponse(error, req, res);
      }
    } else {
      return res.status(500).json({
        success: false,
        error: "Ingrese los datos correctamente.",
      });
    }
  } else {
    return res.status(404).json({
      success: false,
      error: "No existe el producto.",
    });
  }
};

export const deleteProducts = async (req, res, next) => {
  const id = Number(req.params.id);

  if (id) {
    try {
      const product = await productosDao.getById(id);

      if (product) {
        await productosDao.deleteById(id);

        return res.status(204).json({
          success: true,
          message: "Product was deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          error: "Product doesn't exists",
        });
      }
    } catch (error) {
      errorResponse(error, req, res);
    }
  } else {
    try {
      const products = await productosDao.getAll();

      if (products.length > 0) {
        await productosDao.deleteAll();

        return res.status(204).json({
          success: true,
          message: "All products was deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          error: "Array is empty",
        });
      }
    } catch (error) {
      errorResponse(error, req, res);
    }
  }
};
