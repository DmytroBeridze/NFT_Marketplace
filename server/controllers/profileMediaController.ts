import { Request, Response } from "express";
import { ImageRequest } from "../types/types.js";
import FormData from "form-data";
import { handleControllerError } from "../utils/handleControllerError.js";
import axios from "axios";
import User from "../models/User.js";

export const handleProfileImage = async (
  req: ImageRequest,
  res: Response,
  type: "avatar" | "banner",
) => {
  try {
    const id = req.userId;
    const file = req.file;
    const apikey = process.env.IMGBB_API_KEY;

    if (!id) return res.status(403).json("accessDenied");
    if (!file) return res.status(403).json("fileNotFound");

    const base64 = file.buffer.toString("base64");

    const formData = new FormData();
    formData.append("image", base64);
    formData.append("name", `${type}-${id}`);

    const resp = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apikey}`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 20000,
      },
    );

    const deleteUrl = resp.data.data.delete_url;
    const url = resp.data.data.url;

    const update =
      type === "avatar"
        ? { avatarUrl: url, avatarDeleteUrl: deleteUrl }
        : { bannerUrl: url, bannerDeleteUrl: deleteUrl };

    const updatedUser = await User.findByIdAndUpdate(id, update, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "imageUploaded", user: updatedUser });
  } catch (error) {
    handleControllerError(error, res, "failedToUploadImage");
  }
};

// ------------upload avatar
export const uploadAvatar = async (req: ImageRequest, res: Response) => {
  return handleProfileImage(req, res, "avatar");
};

// ------------upload banner
export const uploadBanner = async (req: ImageRequest, res: Response) => {
  return handleProfileImage(req, res, "banner");
};

// export const sendAvatar = async (req: ImageRequest, res: Response) => {
//   try {
//     const id = req.userId;
//     const file = req.file;
//     const apikey = process.env.IMGBB_API_KEY;

//     if (!id) return res.status(403).json("accessDenied");
//     if (!file) return res.status(403).json("fileNotFound");

//     const base64 = file.buffer.toString("base64");

//     const formData = new FormData();
//     formData.append("image", base64);
//     formData.append("name", `${req.body.name || ""}:nft-avatars-bd`);

//     const resp = await axios.post(
//       `https://api.imgbb.com/1/upload?key=${apikey}`,
//       formData,
//       {
//         headers: formData.getHeaders(),
//         timeout: 20000,
//       },
//     );

//     const deleteUrl = resp.data.data.delete_url;
//     const url = resp.data.data.url;

//     res.status(200).json({ message: "imageUploaded", deleteUrl, url });
//   } catch (error) {
//     handleControllerError(error, res, "failedToUploadImage");
//   }
// };
