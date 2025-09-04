import { Router } from "express";
import { theme } from "../controllers/themeController";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

// http://localhost:3002/api/theme
router.patch("/", checkAuth, theme);

export default router;
