
import express from "express";
import UserRouter from "./routes/user.routes.js";
import TaskRouter from "./routes/task.routes.js";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import {
    generalLimiter,
    authLimiter
} from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app=express();
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


app.use(generalLimiter);

//testing
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});


//Health Check

app.get("/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;

  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? "healthy" : "unhealthy",
    database: dbConnected ? "connected" : "disconnected",
  });
});

// حد أشد لمحاولات تسجيل الدخول
app.use("/api/users/login", authLimiter);

app.use("/api",UserRouter);
app.use("/api",TaskRouter);




// Error handler يجب أن يكون أخيرًا
app.use(errorHandler);



export default app;
