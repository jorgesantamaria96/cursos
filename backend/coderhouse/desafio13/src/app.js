import express from "express";
import cors from "cors";
import { Server as HttpServer, Server } from "http";
import { Server as IoServer } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import { promises as fs } from "fs";
import mongoose from "mongoose";

// Importación para config de __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";

// Importacion de lo necesario para la session
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

// Mis importaciones
import router from "./router/routes.js";
import ContenedorArchivo from "./contenedor/contenedorArchivo.js";
import { normalizeChat } from "./utils/normalizr.js";

// Configuración __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración server
const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);
const port = process.env.PORT || 8080;

// Session y MongoDB
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(process.env.MONGODB_URI);

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      mongoOptions: advancedOptions,
    }),
    cookie: {
      maxAge: 60000 * 60, // 1 minute * 1 hour = 1 hour
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Configuración general
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/public");
app.use("/", router);

httpServer.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});

/* Contenedores */
const ProductsContainer = new ContenedorArchivo("productos");
const ChatContainer = new ContenedorArchivo("chat");

// Instancia de socket.io
io.on("connection", async (socket) => {
  console.log("New conection " + socket.id);

  /* Sockect para products */

  // Envío de productos
  let products = await ProductsContainer.getAll();
  socket.emit("server:list_products", products);

  // Escucha nuevos productos
  socket.on("client:save_product", async (prod) => {
    await ProductsContainer.save(prod);

    products = await ProductsContainer.getAll();
    socket.emit("server:list_products", products);
  });

  /* Socket para el chat */

  // Envio los mensajes previos al cliente
  let messages = await ChatContainer.getAll();
  socket.emit("server:all_messages", messages);

  // Escucho los nuevos mensajes
  socket.on("client:new_message", async (msg) => {
    await ChatContainer.save(msg);

    messages = await ChatContainer.getAll();
    io.sockets.emit("server:all_messages", messages);
  });

  (async () => {
    try {
      await norm();
    } catch (err) {
      console.error(err);
    }
  })();
});

// Función normalizar que utiliza fileSystem
const norm = async () => {
  const data = await fs.readFile(__dirname + "/contenedor/chat.txt", "utf-8");
  const chat = normalizeChat(data);
  await fs.writeFile(
    __dirname + "/contenedor/normalized.txt",
    JSON.stringify(chat, null, 2)
  );
};
