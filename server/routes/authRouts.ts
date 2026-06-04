import { Router } from "express";
import {
  register,
  login,
  getMe,
  deleteProfile,
} from "../controllers/authController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { body, check } from "express-validator";
import { checkValidation } from "../middleware/checkValidation.js";
const router = Router();

//Registration

// http://localhost:3002/api/auth/register
router.post(
  "/register",
  [
    check("userName", "usernameIsRequired").notEmpty(),
    check("userPass", "passwordLength").isLength({
      min: 3,
    }),
    checkValidation,
  ],
  register,
);

// Login
// http://localhost:3002/api/auth/login
router.post(
  "/login",
  [
    check("userName", "usernameIsRequired").notEmpty(),
    check("userPass", "passwordIsRequired").notEmpty(),
    checkValidation,
  ],
  login,
);

// Get profile
// http://localhost:3002/api/auth/me
router.get("/me", checkAuth, getMe);

// http://localhost:3002/api/auth/profile
// Delete profile
router.delete("/profile/:id", checkAuth, deleteProfile);

export default router;
