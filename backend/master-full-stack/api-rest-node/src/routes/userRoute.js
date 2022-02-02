const express = require("express");
const UserController = require("../controllers/userController");
const MiddAuth = require("../middlewares/authenticated");
const multipart = require("connect-multiparty");

const router = express.Router();
const md_upload = multipart({ uploadDir: "../uploads/users" });

// Rutas de prueba
router.get("/probando", UserController.probando);
router.get("/testeando", UserController.testeando);

// Rutas de usuarios
router.post("/register", UserController.save);
router.post("/login", UserController.login);
router.put("/update", MiddAuth.authentication, UserController.update);
router.post(
  "/upload-avatar",
  [MiddAuth.authentication, multipart({ uploadDir: "src/uploads/users" })],
  UserController.uploadAvatar
);
router.get("/avatar/:fileName", MiddAuth.authentication, UserController.avatar);
router.get("/users", UserController.getUsers);
router.get("/user/:userId", UserController.getUser);

module.exports = router;
