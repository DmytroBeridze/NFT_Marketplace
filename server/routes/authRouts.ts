import { Router } from "express";
import { register, login, getMe } from "../controllers/authController";
const router = Router();

//Registration

// http://localhost:3002/api/auth/register
router.post("/register", register);

// Login
// http://localhost:3002/api/auth/login
router.post("/login", login);

// Get profile
// http://localhost:3002/api/auth/me
router.get("/me", getMe);

export default router;
