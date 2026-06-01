import express from "express";
import { updateLikes } from "../controllers/updateNftLikesController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { param } from "express-validator";

const router = express.Router();

// --------------guest patch
router.patch(
  "/:nftId",
  [param("nftId").isMongoId().withMessage("invalidNftId")],
  checkAuth,
  updateLikes,
);
export default router;
