import {
  getGalleriesByAuthor,
  setAuthorGalleries,
} from "../controllers/galleryController";
import express from "express";
const router = express.Router();

router.get("/", getGalleriesByAuthor);
router.post("/", setAuthorGalleries);

export default router;
