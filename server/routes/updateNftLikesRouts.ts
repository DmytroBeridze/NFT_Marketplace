import express from "express";
import { updateLikes } from "../controllers/updateNftLikesController";
import { checkAuth } from "../middleware/checkAuth";
import { param } from "express-validator";

const router = express.Router();

// --------------guest patch
router.patch(
  "/:nftId",
  [param("nftId").isMongoId().withMessage("Invalid NFT ID")],
  checkAuth,
  updateLikes
);
export default router;
