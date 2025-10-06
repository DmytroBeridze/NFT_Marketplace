import { Request, Response } from "express";
import { IRequest } from "../types/types";
import Nft from "../models/Nft";
import { handleControllerError } from "../utils/handleControllerError";
import mongoose from "mongoose";

type StatsRequest = Omit<IRequest, "categoryId">;

export const updateNftViews = async (req: StatsRequest, res: Response) => {
  try {
    const { userId } = req; //міддлвар
    const { nftId } = req.params;
    const { views } = req.body;

    // !--------перевіряю в роуті в міддлварі
    // if (!mongoose.Types.ObjectId.isValid(nftId)) {
    //   return res.status(400).json("Invalid NFT ID");
    // }

    if (!userId) return res.status(401).json({ message: "UserNotRegistered" });

    const nft = await Nft.findById(nftId);
    if (!nft) return res.status(404).json({ message: "nftNotFound" });

    // перевірка , якщо це автор то не відображаються перегляди
    if (nft?.authorId?.toString() === userId.toString()) {
      return res.status(403).json({ message: "accessDenied" });
    }

    const updateData: any = {};
    const viewsNumber = Number(views);

    if (!isNaN(viewsNumber) && viewsNumber >= 0) {
      updateData.views = viewsNumber;
    }

    const update = viewsNumber >= 0 ? { $inc: updateData } : {};
    const updatedNft = await Nft.findByIdAndUpdate(nftId, update, {
      new: true,
    });
    // const updatedNft = await Nft.findByIdAndUpdate(
    //   nftId,
    //   { $inc: updateData },
    //   { new: true }
    // );
    res.status(200).json({ message: "NftUpdated", updatedNft });
  } catch (error) {
    const errorMessage = "NftNotUpdated";
    handleControllerError(error, res, errorMessage);
  }
};
