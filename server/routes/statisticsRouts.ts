import { Router } from "express";
import { statisticsRouts } from "../controllers/statisticsController.js";

const router = Router();

router.get("/", statisticsRouts);

export default router;
