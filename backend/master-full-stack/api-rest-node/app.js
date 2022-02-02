"use strict";

// Requires
const express = require("express");
const morgan = require("morgan");

// Ejecutar express
const app = express();

// Cargar archivos de rutas
const userRouter = require("./src/routes/userRoute");
const topicRouter = require("./src/routes/topicRoute");
const commentRouter = require("./src/routes/commentRoute");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Reescribir rutas
app.use("/api", userRouter);
app.use("/api", topicRouter);
app.use("/api", commentRouter);

// Exportar modulo
module.exports = app;
