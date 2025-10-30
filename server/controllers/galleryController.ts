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

// ---------------------------------🧩 get Gallery by rating

export const getGalleryByRating = async (req: Request, res: Response) => {
  try {
    const galleries = await Gallery.aggregate([
      //  Подтянуть к каждой галерее массив NFT, которые принадлежат ей
      {
        $lookup: {
          from: "nfts", // коллекция, из которой подтягиваем данные (NFT)
          localField: "_id", // поле в Gallery (id галереи)
          foreignField: "gallery", // поле в NFT, которое хранит id галереи
          as: "nfts", // как назвать поле с найденными NFT у галереи
        },
      },
      //  Посчитать средний рейтинг NFT внутри каждой галереи
      {
        $addFields: {
          avgRating: { $ifNull: [{ $avg: "$nfts.rating" }, 0] }, // если нет рейтинга → 0
        },
      },
      //  Отсортировать галереи по среднему рейтингу (от большего к меньшему)
      { $sort: { avgRating: -1 } },
      //  Оставить только топ-3 галереи
      { $limit: 3 },
      //  Выбрать, какие поля отправить клиенту
      {
        $project: {
          name: 1, // отдать поле name
          cover: 1, // отдать обложку галереи
          avgRating: 1, // отдать средний рейтинг
          nfts: { $slice: ["$nfts", 3] }, // оставить только первые 3 NFT в массиве для превь
        },
      },
    ]);

    res.status(200).json({ message: "Galleries loaded", galleries });
  } catch (error) {
    handleControllerError(error, res, "Galleries loading error");
  }
};
