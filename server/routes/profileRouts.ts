import {
  becomeAuthor,
  changeProfile,
  deleteProfile,
  getProfileById,
} from "../controllers/profileController.js";
import { checkAuth } from "../middleware/checkAuth.js";

// http://localhost:3002/api/profile

import express from "express";
import { checkValidation } from "../middleware/checkValidation.js";

import { profileValidation } from "../validators/profileValidation .js";
const router = express.Router();
console.log("PROFILE ROUTER LOADED");
// ---change profile
router.patch(
  "/change",
  checkAuth,
  profileValidation,
  checkValidation,
  changeProfile,
);

// ---get info by id
router.get("/profile-id/:id", getProfileById);

// delete profile
router.delete("/:id", checkAuth, deleteProfile);
// router.delete("/profile/:id", checkAuth, deleteProfile);

// -become author
router.patch("/become-author", checkAuth, becomeAuthor);
export default router;
