import { Response } from "express";
import User from "../models/User.js";
import mongoose from "mongoose";
import { IRequest } from "../types/types.js";
import { handleControllerError } from "../utils/handleControllerError.js";
import Nft from "../models/Nft.js";
// --------------------------------🧩-change profile

export const changeProfile = async (req: IRequest, res: Response) => {
  try {
    const { bio, socialLinks } = req.body;
    // const { userId } = req.params;

    if (typeof bio !== "string") {
      return res.status(400).json({ message: "invalidBio" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        bio,
        socialLinks,
      },
      // -----поверне оновлений документ після змін.
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "userNotFound" });
    }

    return res.status(200).json({ message: "updateSuccessfully" });
  } catch (error) {
    return handleControllerError(error, res, "serverError");
  }
};

// --------------------------------🧩-get info by id

export const getProfileById = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    // if (!id) return res.status(401).json({ message: "accessDenied" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalidUserId" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "userNotFound" });

    return res.status(200).json({ message: "userLoaded", user });
  } catch (error) {
    return handleControllerError(error, res, "serverError");
  }
};

// --------------------------------🧩-delete profile

export const deleteProfile = async (req: IRequest, res: Response) => {
  try {
    const userid = req.userId;
    const deletedProfileId = req.params.id;
    const role = req.roles;

    if (!userid) return res.status(403).json({ message: "accessDenied" });

    if (
      !mongoose.Types.ObjectId.isValid(userid) ||
      !mongoose.Types.ObjectId.isValid(deletedProfileId)
    )
      return;

    const user = await User.findById(userid).populate("roles", "value");

    if (user?.id !== deletedProfileId && !role?.includes("ADMIN")) {
      return res.status(403).json({ message: "accessDenied" });
    }

    // !---------проверить после создания UI

    await Promise.all([
      User.findByIdAndDelete(deletedProfileId),
      Nft.deleteMany({ authorId: deletedProfileId }),
    ]);
    // await User.findByIdAndDelete(deletedProfileId);
    // await Nft.deleteMany({ authorId: deletedProfileId });

    res.status(200).json({ messege: "delete profile" });
  } catch (error) {
    handleControllerError(error, res, "Not deleted profile");
  }
};

// --------------------------------🧩-become author

export const becomeAuthor = async (req: IRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "accessDenied" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "userNotFound" });
    }

    if (user.userType === "author") {
      return res.status(400).json({ message: "alreadyAuthor" });
    }

    user.userType = "author";
    await user.save();

    return res.status(200).json({ message: "authorActivated" });
  } catch (error) {
    return handleControllerError(error, res, "serverError");
  }
};
