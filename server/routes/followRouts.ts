import { Request, Response, Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  deleteFollow,
  follow,
  getFollowers,
  getFollowing,
  isFollowing,
} from "../controllers/followController.js";

// http://localhost:3002/api/
const router = Router();

// ---------------follow
router.post("/:id", checkAuth, follow);

// ----------delete follow
router.delete("/:id", checkAuth, deleteFollow);

// --------check following

router.get("/check/:id", checkAuth, isFollowing);

// --------get following
router.get("/following", checkAuth, getFollowing);

// --------get followers
router.get("/followers/:id", getFollowers);

export default router;
