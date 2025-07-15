import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouts";

dotenv.config();
const app = express();

// Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

// --Errors
// синхронные исключения, не обёрнутые в try/catch
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
// необработанные промисы
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

// ---
// Middleware
app.use(cors());
app.use(express.json());
// http://localhost:3002/
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.hwktn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster1`
    );
    console.log("✅ MongoDB connected!");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
