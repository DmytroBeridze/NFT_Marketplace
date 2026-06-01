import { Router } from "express";
import { theme } from "../controllers/themeController.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = Router();

// http://localhost:3002/api/theme
// router.patch("/", theme);
router.patch("/", checkAuth, theme);

export default router;
