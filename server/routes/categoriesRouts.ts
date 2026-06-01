import { Router } from "express";
import { getCategory } from "../controllers/categoryController.js";

const router = Router();

router.get("/", getCategory);
export default router;
