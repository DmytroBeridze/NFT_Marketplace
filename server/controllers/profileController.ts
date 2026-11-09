import { Response } from "express";
import User, { IUser } from "../models/User.js";
import mongoose from "mongoose";
import { IRequest } from "../types/types.js";
import { handleControllerError } from "../utils/handleControllerError.js";
import Nft from "../models/Nft.js";
import bcrypt from "bcryptjs";
// --------------------------------🧩-change profile

export const changeProfile = async (req: IRequest, res: Response) => {
  try {
    const {
      bio,
      socialLinks,
      userMail,
      userPass,
      currentPassword,
      userName,
      avatar,
      coverImage,
    } = req.body;
    // const { userId } = req.params;

    const updateData: Partial<IUser> = {};

    //-------- --Name

    if (userName !== undefined) {
      if (typeof userName !== "string" || !userName.trim()) {
        return res.status(400).json({ message: "invalidName" });
      }
      updateData.userName = userName.trim();
    }

    //-------- --Avatar
    if (avatar !== undefined) {
      if (typeof avatar !== "string" || !avatar.trim()) {
        return res.status(400).json({ message: "invalidAvatarLink" });
      }
      updateData.avatar = avatar.trim();
    }
    //-------- --СoverImage
    if (coverImage !== undefined) {
      if (typeof coverImage !== "string" || !coverImage.trim()) {
        return res.status(400).json({ message: "invalidCoverImage" });
      }
      updateData.coverImage = coverImage.trim();
    }

    //-------- --Bio
    if (bio !== undefined) {
      if (typeof bio !== "string") {
        return res.status(400).json({ message: "invalidBio" });
      }
      updateData.bio = bio.trim();
    }
    //--------- Social links

    if (socialLinks !== undefined) {
      if (
        typeof socialLinks !== "object" ||
        socialLinks === null ||
        Array.isArray(socialLinks)
      ) {
        return res.status(400).json({ message: "invalidSocialLinks" });
      }
      updateData.socialLinks = socialLinks;
    }

    // ---------Email

    if (userMail !== undefined) {
      if (typeof userMail !== "string" || !userMail.trim()) {
        return res.status(400).json({ message: "invalide mail" });
      }
      const normalizedEmail = userMail.trim().toLowerCase();

      const isUsedMail = await User.findOne({
        userMail: normalizedEmail,
        _id: { $ne: req.userId },
      });

      if (isUsedMail) {
        return res.status(409).json({ message: "mailExists" });
      }
      updateData.userMail = normalizedEmail;
    }

    // --------------Password

    if (userPass !== undefined) {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ message: "userNotFound" });
      }

      if (typeof currentPassword !== "string" || !currentPassword) {
        return res.status(400).json({ message: "currentPasswordRequired" });
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        return res.status(400).json({ message: "incorrectCurrentPassword" });
      }

      if (typeof userPass !== "string" || userPass.length < 8) {
        return res.status(400).json({ message: "invalidPassword" });
      }
      updateData.password = await bcrypt.hash(userPass, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "noDataToUpdate" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      // -----поверне оновлений документ після змін.
      { new: true, runValidators: true },
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
      return res.status(400).json({ message: "invalidUserId" });

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
