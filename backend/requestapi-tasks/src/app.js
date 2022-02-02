import express from "express";
import morgan from "morgan";
import cors from "cors";
import TasksRoutes from "./routes/tasks.routes";

const app = express();

// settings
app.set("port", process.env.port || 3000);

// middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.json("Wellcome to my application!");
});

app.use("/api/tasks", TasksRoutes);

export default app;
