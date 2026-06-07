import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/authRouts.js";
import themeRouter from "./routes/themeRouts.js";
import nftRouter from "./routes/nftRouts.js";
import categoriesRout from "./routes/categoriesRouts.js";
import rolesRout from "./routes/roleRouts.js";
import galleriesRout from "./routes/galleryRouts.js";
import statisticsRout from "./routes/statisticsRouts.js";
import updateNftLikes from "./routes/updateNftLikesRouts.js";
import updateNftViews from "./routes/updateNftViewsRouts.js";
import profileMediaRouter from "./routes/profileMediaRout.js";
import salesConfigRout from "./routes/salesConfigRouts.js";
import subscribersRout from "./routes/subscribersRouts.js";
import followRout from "./routes/followRouts.js";

import cookieParser from "cookie-parser";

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
app.use(
  cors({
    // замінити на URL за яким розгорнутий фронт на сервері
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
// http://localhost:3002/
app.use("/api/auth", authRouter);
app.use("/api/theme", themeRouter);
app.use("/api/nfts", nftRouter);
app.use("/api/category", categoriesRout);
app.use("/api/roles", rolesRout);
app.use("/api/galleries", galleriesRout);
app.use("/api/updateLikes", updateNftLikes);
app.use("/api/updateViews", updateNftViews);
app.use("/api/statistics", statisticsRout);
app.use("/api/profile-media", profileMediaRouter); // pавантаження аватара і баннера
app.use("/api/sales", salesConfigRout);
app.use("/api/subscribe", subscribersRout);
app.use("/api/follow", followRout);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.hwktn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster1`,
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
