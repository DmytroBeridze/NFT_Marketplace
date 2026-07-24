import {
  buyNFT,
  deleteNFT,
  getAuthorsByRating,
  getNft,
  getNftByCreateDate,
  getNftByRating,
  getNftBysale,
  patchNft,
  setNft,
  setNftImage,
} from "../controllers/nftController.js";
import { check } from "express-validator";
import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import multer from "multer";
// import checkNftValidation from "../middleware/checkNftValidation.js";
import { checkValidation } from "../middleware/checkValidation.js";
import {
  patchNftValidation,
  setNftValidation,
} from "../validators/nftValidation.js";

const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// --Обмеження завантажуваного файла
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// http://localhost:3002/api/nfts

//-------------------------getNft
router.get("/", getNft);
//-------------------------get NFT by rating

router.get("/byRating", getNftByRating);

//-------------------------get NFT by Date
router.get("/byDate", getNftByCreateDate);

//-------------------------get NFT by Sale
router.get("/bysale", getNftBysale);

//-------------------------buy NFT
router.post("/:id/buy", checkAuth, buyNFT);
// router.patch("/buyNFT", checkAuth, buyNFT);

// ----------------------set Nft
router.post("/", checkAuth, setNftValidation, checkValidation, setNft);

//------------------ patch Nft
router.patch("/:id", checkAuth, patchNftValidation, checkValidation, patchNft);

// ------------------------------delete Nft

router.delete("/:id", checkAuth, deleteNFT);

// ------------------------image upload
router.post(
  "/imgUpload",

  checkAuth,
  upload.single("image"),
  setNftImage,
);

// ------------------------get top authors

router.get("/topAuthors", getAuthorsByRating);

export default router;
