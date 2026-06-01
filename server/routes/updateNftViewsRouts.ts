import express from "express";
import { updateNftViews } from "../controllers/updateNftViewsController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { param } from "express-validator";
const router = express.Router();

router.patch(
  "/:nftId",
  [param("nftId").isMongoId().withMessage("invalidNftId")],
  checkAuth,
  updateNftViews,
);
export default router;
