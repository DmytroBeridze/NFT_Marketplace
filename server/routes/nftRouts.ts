import {
  deleteNFT,
  getNft,
  patchNft,
  setNft,
  setNftImage,
} from "../controllers/nftController";

import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// http://localhost:3002/api/nfts
router.get("/", getNft);
router.post("/", checkAuth, setNft);
router.patch("/:id", checkAuth, patchNft);
router.delete("/:id", checkAuth, deleteNFT);
router.post("/imgUpload", upload.single("image"), setNftImage);

export default router;
