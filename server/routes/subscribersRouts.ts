import { Router } from "express";
import { setMail } from "../controllers/subscribersController";
import { check } from "express-validator";
import { checkValidation } from "../middleware/checkValidation";

const router = Router();

router.post(
  "/set",
  [
    check("email", "Email is required")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail(),

    checkValidation,
  ],

  setMail,
);
export default router;
