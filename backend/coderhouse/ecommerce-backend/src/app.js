import express from "express";
import cors from "cors";
import ProductRoutes from "./routes/ProductRoutes.js";
import CarritoRoutes from "./routes/CarritoRoutes.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <div>
      <h1>Proyecto Final (3° entrega) - Ecommerce</h1>
      <h3>Realizado por Jorge Santamaria</h3>
    </div>
  `);
});

app.use("/api/productos", ProductRoutes);
app.use("/api/carrito", CarritoRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
