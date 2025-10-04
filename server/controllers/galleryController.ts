import { Request, Response } from "express";
import Gallery from "../models/Gallery";
import Nft from "../models/Nft";
import { handleControllerError } from "../utils/handleControllerError";
import mongoose from "mongoose";

// ---------------------------------🧩 get Gallery by author id
export const getGalleriesByAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = req.query.authorId as string;

    if (!authorId)
      return res.status(400).json({ message: "AuthorId is required" });

    const galleries = await Gallery.find({ author: authorId });
    res.status(200).json({ galleries, message: "Galleries loaded" });
  } catch (error) {
    handleControllerError(error, res, "Galleries loading error");
  }
};

// ---------------------------------🧩 set Gallery by author id
export const setAuthorGalleries = async (req: Request, res: Response) => {
  try {
    const { name, cover } = req.body;
    const authorQuery = req.query.authorId as string;

    if (!name) return res.status(400).json({ message: "Name required" });
    if (!authorQuery)
      return res.status(400).json({ message: "AuthorId is required" });

    const author = new mongoose.Types.ObjectId(authorQuery as string);
    const newElement = new Gallery({
      name,
      cover,
      author,
    });

    await newElement.save();

    res
      .status(200)
      .json({ gallery: newElement.toObject(), message: "Galleries uploaded" });
  } catch (error) {
    handleControllerError(error, res, "Galleries upload error");
  }
};

// ---------------------------------🧩 delete Gallery
export const deleteGallery = async (req: Request, res: Response) => {
  try {
    const galleryId = req.query.galleryId as string;

    if (!galleryId)
      return res.status(400).json({ message: "Gallery is required" });

    const deletedGallery = await Gallery.findByIdAndDelete(galleryId);
    if (!deletedGallery)
      return res.status(404).json({ message: "Gallery not found" });

    // видаляємо галерею з Nft
    const updateResult = await Nft.updateMany(
      { galleryId },
      { $unset: { galleryId: "" } }
    );

    res.status(200).json({
      galleryId: deletedGallery._id,
      updatedNfts: updateResult.modifiedCount,
      message: `Gallery ${deletedGallery.name} deleted`,
    });
  } catch (error) {
    handleControllerError(error, res, "Gallery delete error");
  }
};
