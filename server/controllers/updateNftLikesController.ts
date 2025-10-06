import { Response } from "express";
import { IRequest } from "../types/types";
import { handleControllerError } from "../utils/handleControllerError";
import Nft, { INft } from "../models/Nft";
import User from "../models/User";
import mongoose from "mongoose";

type StatsRequest = Omit<IRequest, "categoryId">;
// interface StatsRequest extends Omit<IRequest, "categoryId"> {}

export const updateLikes = async (req: StatsRequest, res: Response) => {
  try {
    const { userId } = req; //міддлвар
    const { nftId } = req.params;
    // const { likes, views } = req.body;

    if (!userId) return res.status(401).json({ message: "UserNotRegistered" });

    //!  ----------перевірка в роуті в міддлварі
    // if (!mongoose.Types.ObjectId.isValid(nftId)) {
    //   return res.status(400).json({ message: "Invalid NFT ID" });
    // }

    const nft = await Nft.findById(nftId);
    if (!nft) return res.status(404).json({ message: "nftNotFound" });

    // перевірка , якщо це автор то він не має права ставити лайки
    if (nft?.authorId?.toString() === userId.toString()) {
      return res.status(403).json({ message: "accessDenied" });
    }

    const userIdObj = new mongoose.Types.ObjectId(userId);

    if (
      nft?.likes &&
      !nft?.likes.some((id) => id._id.toString() === userIdObj.toString())
    ) {
      nft.likes.push(userIdObj);
    } else {
      nft.likes = nft.likes?.filter(
        (id) => id._id.toString() !== userIdObj.toString()
      );
    }

    await nft.save();
    await nft.populate("likes", "userName _id avatar");

    res.status(200).json({
      message: "NftUpdated",
      updatedNft: nft,
      interestedUsers: nft.likes,
    });
    // .json({ message: "Nfs updated", updatedNft, interestedUsers: nft.likes });
  } catch (error) {
    const errorMessage = "NftNotUpdated";
    handleControllerError(error, res, errorMessage);
  }
};
