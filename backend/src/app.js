import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import authenticate from "./middleware/auth.js";
import authorize from "./middleware/role.js"; // i'll delete
import taskRoutes from "./routes/task.routes.js";
import errorHandler from "./middleware/error.js";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Manager API Running"
    });
});

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

app.get("/api/v1/profile", authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected Route",
        user: req.user,
    }); 
});

app.get(
    "/api/v1/admin",
    authenticate,
    authorize("admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin",
        });
    }
);

export default app;