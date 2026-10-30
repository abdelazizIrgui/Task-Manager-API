
import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";
import db from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 7000;

const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await db();

    console.log("MongoDB connected successfully");

    // 2. Start HTTP server
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

    // 3. Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`${signal} received. Closing server...`);

      server.close(async (error) => {
        if (error) {
          console.error("Server shutdown error:", error);
          process.exitCode = 1;
        }

        try {
          await mongoose.disconnect();
          console.log("MongoDB disconnected");

          process.exit(process.exitCode || 0);
        } catch (err) {
          console.error("MongoDB disconnect error:", err);
          process.exit(1);
        }
      });
    };

    // 4. Listen for shutdown signals
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

  } catch (error) {
    console.error("Application startup failed:", error);
    process.exit(1);
  }
};

startServer();
