import { Request, Response } from "express";
import { Router } from "express";
import { getCurrency } from "../controllers/currencyController.js";

const router = Router();

router.get("/get", getCurrency);

export default router;
