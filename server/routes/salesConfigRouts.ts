import express from "express";
import { salesConfig } from "../controllers/salesConfigController";
const router = express.Router();

router.get("/config", salesConfig);
export default router;
