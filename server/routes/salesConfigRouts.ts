import express from "express";
import { salesConfig } from "../controllers/salesConfigController.js";
const router = express.Router();

router.get("/config", salesConfig);
export default router;
