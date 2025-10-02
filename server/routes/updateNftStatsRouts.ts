import express from "express";
import { updateStats } from "../controllers/updateNftStatsController";
import { checkAuth } from "../middleware/checkAuth";
const router = express.Router();

router.patch("/:nftId", checkAuth, updateStats);
export default router;
