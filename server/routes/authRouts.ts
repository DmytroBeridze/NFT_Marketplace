import { Router } from "express";
import { register, login, getMe } from "../controllers/authController";
import { checkAuth } from "../middleware/checkAuth";
import { check } from "express-validator";
import { checkValidation } from "../middleware/checkValidation";
const router = Router();

//Registration

// http://localhost:3002/api/auth/register
router.post(
  "/register",
  [
    check("userName", "Username is required").notEmpty(),
    check("password", "Password should be at least 3 chars").isLength({
      min: 3,
    }),
    checkValidation,
  ],
  register
);

// Login
// http://localhost:3002/api/auth/login
router.post(
  "/login",
  [
    check("userName", "Username is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
    checkValidation,
  ],
  login
);

// Get profile
// http://localhost:3002/api/auth/me
router.get("/me", checkAuth, getMe);

export default router;
