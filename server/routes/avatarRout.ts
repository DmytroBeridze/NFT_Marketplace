import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import multer from "multer";
import { sendAvatar } from "../controllers/avatarController";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fieldSize: 5 * 1024 * 1024 },
});

const router = express.Router();
router.post("/", checkAuth, upload.single("avatar"), sendAvatar);

export default router;
