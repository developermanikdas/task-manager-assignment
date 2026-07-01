import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import errorHandler from "./middleware/error.js";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";


const app = express();

app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://task-manager-assignment-beta-three.vercel.app/",
    ],
    credentials: true,
  }));
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

app.use(errorHandler);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Manager API Running"
    });
});

export default app;