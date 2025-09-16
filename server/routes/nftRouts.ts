import {
  deleteNFT,
  getNft,
  patchNft,
  setNft,
} from "../controllers/nftController";

import express from "express";
import { checkAuth } from "../middleware/checkAuth";
const router = express.Router();

// http://localhost:3002/api/nfts
router.get("/", getNft);
router.post("/", checkAuth, setNft);
router.patch("/:id", checkAuth, patchNft);
router.delete("/:id", checkAuth, deleteNFT);
export default router;
