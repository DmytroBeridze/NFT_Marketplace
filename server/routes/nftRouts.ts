import {
  deleteNFT,
  getNft,
  getNftByRating,
  patchNft,
  setNft,
  setNftImage,
} from "../controllers/nftController";
import { check } from "express-validator";
import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import multer from "multer";
import checkNftValidation from "../middleware/checkNftValidation";

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

// ----------------------set Nft
router.post(
  "/",
  checkAuth,
  [
    check("name").notEmpty().withMessage("NameIsRequired"),
    check("description").notEmpty().withMessage("DescriptionIsRequired"),
    check("imageUrl").notEmpty().withMessage("ImageIsRequired"),
    check("price").notEmpty().withMessage("PriceIsRequired"),
    check("deleteImageUrl").notEmpty().withMessage("DeleteImageUrlIsRequired"),

    check("keywords")
      .notEmpty()
      .custom((val) => {
        const arr = Array.isArray(val) // якщо масив- вертаэмо так
          ? val
          : val
              .split(",") //якщо строка робимо масив по комам
              .map((v: string) => v.trim()) // обрізаєм пробіли
              .filter((v: string) => Boolean(v)); // позбуваємось пустих строк в середені
        return arr.length >= 3;
      })
      .withMessage("NeedAtLeastThreeKeywords"),

    checkNftValidation,
  ],
  setNft
);

//------------------ patch Nft
router.patch(
  "/:id",
  checkAuth,
  [
    check("name").optional().notEmpty().withMessage("NameIsRequired"),
    check("description")
      .optional()
      .notEmpty()
      .withMessage("DescriptionIsRequired"),
    check("imageUrl").optional().notEmpty().withMessage("ImageIsRequired"),
    check("price").optional().notEmpty().withMessage("PriceIsRequired"),
    check("deleteImageUrl")
      .optional()
      .notEmpty()
      .withMessage("DeleteImageUrlIsRequired"),

    check("keywords")
      .optional()
      .notEmpty()
      .custom((val) => {
        const arr = Array.isArray(val) // якщо масив- вертаэмо так
          ? val
          : val
              .split(",") //якщо строка робимо масив по комам
              .map((v: string) => v.trim()) // обрізаєм пробіли
              .filter((v: string) => Boolean(v)); // позбуваємось пустих сирок в середені
        return arr.length >= 3;
      })
      .withMessage("NeedAtLeastThreeKeywords"),

    checkNftValidation,
  ],
  patchNft
);

// ------------------------------delete Nft

router.delete("/:id", checkAuth, deleteNFT);

// ------------------------image upload
router.post(
  "/imgUpload",

  checkAuth,
  upload.single("image"),
  setNftImage
);

export default router;
