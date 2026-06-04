import { Request, Response } from "express";
import { IRequest } from "../types/types.js";
import Follow from "../models/Follow.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const follow = async (req: IRequest, res: Response) => {
  const followerId = req.userId;
  const authorId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: "invalidAuthorId" });
  }

  const author = await User.findById(authorId);
  if (!author) {
    return res.status(404).json({ message: "authorNotFound" });
  }

  if (author.userType !== "author") {
    return res.status(400).json({ message: "userIsNotAuthor" });
  }

  if (authorId === followerId) {
    return res.status(400).json({ message: "cannotFollowYourself" });
  }

  const exist = await Follow.findOne({ followerId, authorId });

  if (exist) {
    return res.status(400).json({ message: "alreadyFollowed" });
  }

  await Follow.create({ followerId, authorId });
  return res.status(201).json({ message: "followSuccess" });
};

// ---------delete follow
export const deleteFollow = async (req: IRequest, res: Response) => {
  const authorId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: "invalidAuthorId" });
  }

  const deletedFollow = await Follow.findOneAndDelete({
    followerId: req.userId,
    authorId,
  });

  if (!deletedFollow) {
    return res.status(404).json({ message: "followNotFound" });
  }

  return res.status(200).json({ message: "unfollowSuccess" });
};

// --------check following
export const isFollowing = async (req: IRequest, res: Response) => {
  const authorId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: "invalidAuthorId" });
  }

  const follow = await Follow.findOne({
    followerId: req.userId,
    authorId,
  });

  return res.status(200).json({ isFollowing: Boolean(follow) });
};

// --------get following
export const getFollowing = async (req: IRequest, res: Response) => {
  const follows = await Follow.find({
    followerId: req.userId,
  }).populate("authorId");

  const authors = follows.map((elem) => elem.authorId as any);

  return res.status(200).json({ authors });
};

// --------get followers
export const getFollowers = async (req: IRequest, res: Response) => {
  const authorId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({ message: "invalidAuthorId" });
  }

  const followersCount = await Follow.countDocuments({
    authorId,
  });

  return res.status(200).json({ followersCount });
};
