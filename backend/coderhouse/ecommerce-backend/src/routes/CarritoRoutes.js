import express from "express";
import {
  createCarrito,
  deleteCarrito,
  createProductByCarrito,
  deleteProduct,
  getProductsByCarrito,
} from "../controllers/CarritoController.js";

const router = express.Router();

router.post("/", createCarrito);
router.delete("/:id", deleteCarrito);
router.get("/:id/productos", getProductsByCarrito);
router.post("/:id/productos", createProductByCarrito);
router.delete("/:id/productos/:id_prod", deleteProduct);

export default router;
