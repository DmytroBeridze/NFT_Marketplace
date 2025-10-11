import { Request, Response, Router } from "express";
import User from "../models/User";
import { handleControllerError } from "../utils/handleControllerError";
import Nft from "../models/Nft";

interface Istatistics {
  artists: number;
  images: number;
  totalSale: number;
}

export const statisticsRouts = async (req: Request, res: Response) => {
  try {
    const artists = await User.countDocuments({ userType: "author" });
    if (!artists) {
      res.status(400).json({ message: "Users not loaded" });
    }

    const images = await Nft.countDocuments();
    if (!images) {
      res.status(400).json({ message: "Images not loaded" });
    }

    const totalSale = await Nft.countDocuments({ sold: true });
    if (!images) {
      res.status(400).json({ message: "Sold not loaded" });
    }

    const statistics: Istatistics = {
      artists,
      images,
      totalSale,
    };

    res.status(200).json({ message: "Statistics are loaded", statistics });
  } catch (error) {
    if (error instanceof Error) {
      handleControllerError(error, res, "Statistics not loaded");
      res.status(400).json({ message: error.message });
    }
  }
};
