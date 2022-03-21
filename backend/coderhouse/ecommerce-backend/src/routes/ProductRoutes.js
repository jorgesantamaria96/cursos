import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProducts,
} from "../controllers/ProductController.js";
import { verifyUser } from "../middlewares/vertifyUser.js";

const router = express.Router();

router.get("/:id?", getProducts);
router.post("/", verifyUser, createProduct);
router.put("/:id", verifyUser, updateProduct);
router.delete("/:id?", verifyUser, deleteProducts);

export default router;
