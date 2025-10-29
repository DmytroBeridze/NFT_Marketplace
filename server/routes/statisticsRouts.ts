import { Router } from "express";
import { statisticsRouts } from "../controllers/statisticsController";

const router = Router();

router.get("/", statisticsRouts);

export default router;
