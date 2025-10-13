import { Request, Response } from "express";
import { IRequest } from "../types/types";
import Nft from "../models/Nft";
import { handleControllerError } from "../utils/handleControllerError";
import mongoose from "mongoose";
import NftView from "../models/NftView";

type StatsRequest = Omit<IRequest, "categoryId">;

export const updateNftViews = async (req: StatsRequest, res: Response) => {
  try {
    const { userId } = req; //міддлвар
    const { nftId } = req.params;
    // const { views } = req.body;
    const typedId = new mongoose.Types.ObjectId(nftId);

    // !--------перевіряю в роуті в міддлварі
    // if (!mongoose.Types.ObjectId.isValid(nftId)) {
    //   return res.status(400).json("Invalid NFT ID");
    // }

    if (!userId) return res.status(401).json({ message: "UserNotRegistered" });

    const nft = await Nft.findById(typedId);
    if (!nft) return res.status(404).json({ message: "nftNotFound" });

    // перевірка , якщо це автор то не відображаються перегляди
    if (nft?.authorId?.toString() === userId.toString()) {
      return res.status(403).json({ message: "accessDenied" });
    }

    // ------------Views
    const nftView = await NftView.find({ nft: typedId, user: userId });
    console.log(nftView);

    if (nftView.length > 0) {
      return res.status(200).json({ message: "alreadyViewed" });
    }

    await NftView.create({ nft: typedId, user: userId });

    const likesCount = nft.likes?.length || 0;
    const viewsCount = (nft.views || 0) + 1; //так як ми інкрементуємо
    const rating = likesCount * 2 + viewsCount * 0.5;

    const updatedNft = await Nft.findByIdAndUpdate(
      nftId,
      { $inc: { views: 1 }, rating },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "NftUpdated", updatedNft });
  } catch (error) {
    const errorMessage = "NftNotUpdated";
    handleControllerError(error, res, errorMessage);
  }
};
