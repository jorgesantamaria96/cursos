import { Router } from "express";
import {
  getFormView,
  getProductTest,
  getChat,
  deleteAllProducts,
  loginUser,
  registerUser,
  requestLogin,
  logoutUser,
  requestRegister,
} from "../controller/controller.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.get("/", auth, getFormView);
router.get("/login", loginUser);
router.get("/register", registerUser);
router.post("/login", requestLogin);
router.post("/register", requestRegister);
router.post("/logout", logoutUser);
router.get("/product-test", auth, getProductTest);
router.get("/chat", auth, getChat);
router.get("/deleteAll", auth, deleteAllProducts);

export default router;
