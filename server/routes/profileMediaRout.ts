import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import multer from "multer";
import {
  uploadAvatar,
  uploadBanner,
} from "../controllers/profileMediaController.js";
// import { sendAvatar } from "../controllers/avatarController.js";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

// -----------------------------на фронте formData.append("file", avatar);
router.post("/avatar", checkAuth, upload.single("file"), uploadAvatar);
router.post("/banner", checkAuth, upload.single("file"), uploadBanner);
// router.post("/", checkAuth, upload.single("avatar"), sendAvatar);

export default router;
