import { Router } from "express";
import { getCategory } from "../controllers/categoryController";

const router = Router();

router.get("/", getCategory);
export default router;
