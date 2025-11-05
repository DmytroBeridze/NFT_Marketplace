import {
  deleteGallery,
  getGalleriesByAuthor,
  getGalleryById,
  getGalleryByRating,
  setAuthorGalleries,
} from "../controllers/galleryController";
import express from "express";
const router = express.Router();

router.get("/", getGalleriesByAuthor);
router.get("/top", getGalleryByRating);
router.get("/:galleryId", getGalleryById);
router.post("/", setAuthorGalleries);
router.delete("/", deleteGallery);

export default router;
