// 📌 Цей контролер отримує список NFT з бази даних.
// Він робить кілька речей:
// 1. Читає параметри з запиту (authorId, galleryId, sold, page, limit).
// 2. Перевіряє, чи є authorId та galleryId валідними ObjectId і додає їх у фільтр.
// 3. Додає умову за полем sold, якщо воно передане.
// 4. Реалізує пагінацію (skip + limit).
// 5. Виконує запит до MongoDB з .populate(), щоб підтягнути дані автора.
// 6. Рахує загальну кількість записів для побудови пагінації на фронті.
// 7. Повертає об’єкт із даними та параметрами сторінок у JSON.

import { Request, Response } from "express";
import mongoose from "mongoose";
import Nft, { INft } from "../models/Nft";
import { ImageRequest, IRequest } from "../types/types";
import axios from "axios";
import FormData from "form-data";
import { handleControllerError } from "../utils/handleControllerError";
import { parseSales } from "../utils/parseSales";

// ---------------------------------🧩 get NFT
export const getNft = async (req: Request, res: Response) => {
  try {
    const {
      authorId,
      galleryId,
      categoryId,
      sold,
      page = 1,
      limit = 12,
      keywords,
    } = req.query;

    //  фільтр
    // const filter: Partial<INft> = {};
    const filter: any = {};
    // перевірка
    if (authorId && mongoose.Types.ObjectId.isValid(authorId as string))
      filter.authorId = new mongoose.Types.ObjectId(authorId as string);
    if (galleryId && mongoose.Types.ObjectId.isValid(galleryId as string))
      filter.galleryId = new mongoose.Types.ObjectId(galleryId as string);
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId as string))
      filter.category = new mongoose.Types.ObjectId(categoryId as string);

    if (sold !== undefined) filter.sold = sold === "true";

    if (keywords) {
      const arrKeys = (keywords as string)
        .split(",")
        .map((elem) => elem.trim());
      filter.keywords = { $in: arrKeys };
    }

    // пагінація
    const skip = (Number(page) - 1) * Number(limit);

    //  запит з populate
    const nfts = await Nft.find(filter)
      .populate("authorId", "userName userMail avatar")
      .skip(skip)
      .limit(Number(limit));

    //   всього записів (для пагінації)
    const total = await Nft.countDocuments(filter);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
      items: nfts,
    });
  } catch (error: any) {
    const errorMessage = "failedToGetNftList";
    return handleControllerError(error, res, errorMessage);
    // if (error.response) {
    //   return res
    //     .status(error.response.status)
    //     .json({ error: error.response.data });
    // }
    // return res.status(500).json({ error: error.message });
  }
};

// -------------------------------------🧩 get NFT by rating

export const getNftByRating = async (req: Request, res: Response) => {
  try {
    const limotParam = req.query.limit;
    const limit = limotParam ? Number(limotParam) : undefined; // якщо limotParam передається з фронта, якщо ні, то повернуться всі карточки

    let query = Nft.find({ rating: { $ne: null } }) // виключаємо ті, в яких поля рейтинга немає
      .sort({ rating: -1 })

      .populate("authorId", "userName avatar")
      .populate("gallery", "name");

    if (limit) {
      query = query.limit(limit);
    }
    const nfts = await query;
    res.status(200).json({ items: nfts });
  } catch (error) {
    return handleControllerError(error, res, "FailedToGetTopNfts");
  }
};
// export const getNftByRating = async (req: Request, res: Response) => {
//   try {
//     const limit = Number(req.query.limit) || 10;

//     const nfts = await Nft.find({ rating: { $ne: null } }) // виключаємо ті, в яких поля рейтинга немає
//       .sort({ rating: -1 })
//       .limit(limit)
//       .populate("authorId", "userName avatar")
//       .populate("gallery", "name");

//     res.status(200).json({ items: nfts });
//   } catch (error) {
//     return handleControllerError(error, res, "FailedToGetTopNfts");
//   }
// };
// -------------------------------------🧩 get NFT by Date
export const getNftByCreateDate = async (req: Request, res: Response) => {
  try {
    const limitParam = req.query.limit;
    const limit = limitParam ? Number(limitParam) : undefined;

    let query = Nft.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "userName avatar")
      .populate("gallery", "name");

    if (limit) {
      query = query.limit(limit);
    }
    const nfts = await query;

    res.status(200).json({ items: nfts });
  } catch (error) {
    return handleControllerError(error, res, "FailedToGetNewestNfts");
  }
};

// -------------------------------------🧩 get NFT by Sale
export const getNftBysale = async (req: Request, res: Response) => {
  try {
    // const limitParam = req.query.limit;
    // const limit = limitParam ? Number(limitParam) : undefined;
    const now = new Date();

    let query = Nft.findOne({
      "sales.isActive": true,
      $and: [
        {
          $or: [
            { "sales.startAt": { $lte: now } },
            { "sales.startAt": null },
            { "sales.startAt": { $exists: false } },
          ],
        },
        {
          $or: [
            { "sales.endAt": { $gte: now } },
            { "sales.endAt": null },
            { "sales.endAt": { $exists: false } },
          ],
        },
      ],
    })

      .populate("authorId", "userName avatar")
      .populate("gallery", "name");

    // if (limit) {
    //   query = query.limit(limit);
    // }
    // const nfts = await query;
    const nft = await query;

    res.status(200).json({ items: nft });
  } catch (error) {
    return handleControllerError(error, res, "FailedToGetNewestNfts");
  }
};

// -------------------------------------🧩 set NFT
export const setNft = async (req: IRequest, res: Response) => {
  let {
    name,
    description,
    imageUrl,
    deleteImageUrl,
    authorId,
    galleryId,
    price,
    sold,
    likes,
    views,
    keywords,
    categoryId,
    isActive,
    percent,
    startAt,
    endAt,
  } = req.body;

  // -------------------userId переданий міддлваром
  const userId = req.userId;

  // const categoryId = await Category.findOne({ _id: category });

  try {
    const newItem: Partial<INft> = {
      name,
      imageUrl,
      deleteImageUrl,
      description,
      likes: [],
      // likes: 0,
      views: 0,
    };

    if (!userId) return res.status(401).json({ message: "accessDenied" });

    if (categoryId === null) newItem.category = undefined;

    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      newItem.category = new mongoose.Types.ObjectId(categoryId as string);
    }
    newItem.authorId = new mongoose.Types.ObjectId(userId);

    // if (!name) return res.status(400).json({ message: "Name is required" });
    // if (!imageUrl)
    //   return res.status(400).json({ message: "Image is required" });

    // // щоб не затирався 0 бо 0 спрацює як "falsey"
    // if (price === undefined)
    //   return res.status(400).json({ message: "Price is required" });

    // if (!keywords || (Array.isArray(keywords) && keywords.length < 3))
    //   return res.status(400).json({ message: "Need at least three keywords" });

    // if (!description)
    //   return res.status(400).json({ message: "Description is required" });

    //  ----------------------Перевірка та конвертація galleryId
    if (galleryId === null) newItem.gallery = undefined;

    if (galleryId && mongoose.Types.ObjectId.isValid(galleryId as string)) {
      newItem.gallery = new mongoose.Types.ObjectId(galleryId as string);
    }

    // ---------------------- Приведення типів price sold
    if (price !== undefined) newItem.price = Number(price);
    if (sold !== undefined) {
      newItem.sold = sold === "true" || sold === true;
      // if (sold === "true" || sold === true) newItem.sold = true;
      // if (sold === "false" || sold === false) newItem.sold = false;
    }

    // if (likes !== undefined) newItem.likes = Number(likes);
    // if (views !== undefined) newItem.views = Number(views);

    // -------------------Перевірка і запис sales
    newItem.sales = parseSales({ isActive, percent, startAt, endAt });

    // ------------------Перевірка і запис keywords
    if (!keywords) return res.status(400).json({ message: "Need keywords" });
    newItem.keywords = Array.isArray(keywords)
      ? keywords.map((elem: string) => elem.trim())
      : keywords.split(",").map((elem: string) => elem.trim());

    // ----------------Створюємо новий документ
    const nft = new Nft(newItem);

    //  ---------------Зберігаємо у БД
    await nft.save();

    res.status(201).json({ message: "nftAdded", item: nft });
  } catch (error: any) {
    const errorMessage = "failedToCreateNft";
    return handleControllerError(error, res, errorMessage);
    // if (error.response) {
    //   return res.status(error.response).json({ error: error.response.data });
    // }
    // return res.status(500).json({ error: error.message });
  }
};

// ------------------------------🧩 patch NFT
export const patchNft = async (req: IRequest, res: Response) => {
  try {
    const {
      name,
      imageUrl,
      galleryId,
      price,
      keywords,
      description,
      deleteImageUrl,
      categoryId,
      isActive,
      percent,
      startAt,
      endAt,
    } = req.body;

    const { id } = req.params; // id NFT з URL

    // перевіряємо чи існує  id NFT з параметрів
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalidNftId" });
    }

    // знаходимо nft
    const nft = await Nft.findById(id);
    if (!nft) return res.status(404).json({ message: "nftNotFound" });

    //  перевіряємо  співвідношення authorId з nft та userId з міддлвар
    const isAuthor = nft.authorId?.toString() == req.userId; //userId встановлений мідлваром
    const isAdmin = req.roles?.includes("ADMIN");

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: "accessDenied" });
    }

    // Нові дані
    const updateData: Partial<INft> = {};

    // Тільки автор може змінювати ім'я, опис та зображення ,
    if (isAuthor) {
      if (name !== undefined) updateData.name = name;
      if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
      if (deleteImageUrl !== undefined)
        updateData.deleteImageUrl = deleteImageUrl;
      if (description !== undefined) updateData.description = description;

      // -------------------Перевірка і запис sales
      const parsedSales = parseSales({ isActive, percent, startAt, endAt });
      if (parsedSales) updateData.sales = parsedSales;
    }

    if (keywords !== undefined) {
      const keys = Array.isArray(keywords)
        ? keywords.map((k: string) => k.trim())
        : keywords.split(",").map((k: string) => k.trim());

      if (keys.length >= 3) updateData.keywords = keys;
    }

    if (price !== undefined) updateData.price = Number(price);

    // ----------------скидаємо галерею
    if (galleryId === null) {
      updateData.gallery = undefined;
    }

    if (galleryId && mongoose.Types.ObjectId.isValid(galleryId as string)) {
      updateData.gallery = new mongoose.Types.ObjectId(galleryId as string);
    }

    // ----------------скидаємо категорії
    if (categoryId === null) {
      updateData.category = undefined;
    }

    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId as string)) {
      updateData.category = new mongoose.Types.ObjectId(categoryId as string);
    }

    // патчимо дані
    const updatedNft = await Nft.findByIdAndUpdate(id, updateData, {
      new: true, // вертаємо вже оновлений документ
      runValidators: true, // mongoose перевірить дані за схемою навіть при update
    });

    res.status(200).json({ message: "nftChanged", item: updatedNft });
  } catch (error: any) {
    const errorMessage = "failedToUpdateNft";
    return handleControllerError(error, res, errorMessage);
    // if (error.response) {
    //   return res
    //     .status(error.response.status)
    //     .json({ message: error.response.data });
    // }
    // return res.status(500).json({ error: error.message });
  }
};

// --------------------------🧩 delete NFT
export const deleteNFT = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    // const nft = await Nft.findById(id).populate<{ authorId: IUser }>(
    //   "authorId"
    // );

    // перевіряємо чи існує  id NFT з параметрів
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "invalidNftId" });
    }

    const nft = await Nft.findById(id);
    const deleteImageUrl = nft?.deleteImageUrl;

    if (!nft) return res.status(404).json({ message: "nftNotFound" });

    //перевіряємо якщо юзер з nft не співпадає з юзером з req або якщо роль не ADMIN
    if (nft.authorId?.toString() !== userId && !req.roles?.includes("ADMIN")) {
      return res.status(403).json({ message: "accessDenied" });
    }

    await nft.deleteOne();

    // const deletedNft = await Nft.findByIdAndDelete(id);

    //?  ⚠️--- delete image in imageBB
    // if (deleteImageUrl) {
    //   console.log(deleteImageUrl);

    //   await axios.get(deleteImageUrl);
    // }
    // res.status(500).json({
    //   message: `Error deleting image from ImgBB`,
    // });
    //? ---------------------------

    return res
      .status(200)
      .json({ message: "nftDeleted", item: nft.toObject() }); //вертаємо перетворюючи в об'єкт щоб забрати службові поля
  } catch (error: any) {
    const errorMessage = "failedToDeleteNft";
    return handleControllerError(error, res, errorMessage);
  }
};

// --------------------------🧩 send NFT image to imgBB
export const setNftImage = async (req: ImageRequest, res: Response) => {
  try {
    const apikey = process.env.IMGBB_API_KEY;
    const file = req.file;

    if (!req.userId) return res.status(403).json({ message: "accessDenied" });

    if (!file) return res.status(400).json({ message: "fileNotFound" });

    // Конвертація в base64
    const base64 = file.buffer.toString("base64");

    // Відправка на ImgBB
    // FormData для Node.js
    const formData = new FormData();
    formData.append("image", base64);
    formData.append("name", `${req.body.name || ""}:nft-gallery-bd`);
    // formData.append("name", "nft-gallery-bd");

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apikey}`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 20000,
      }
    );

    const imageUrl = response.data.data.url;
    const deleteImageUrl = response.data.data.delete_url;
    const imageTitle = response.data.data.title;

    return res
      .status(200)
      .json({ message: "imageUploaded", imageUrl, deleteImageUrl, imageTitle });
  } catch (error: any) {
    const errorMessage = "failedToUploadImage";
    return handleControllerError(error, res, errorMessage);

    // if (error.response) {
    //   return res
    //     .status(error.response.status)
    //     .json({ message: error.response.data });
    // }
    // return res.status(500).json({ message: error.message || "Unknown error" });
  }
};

// --------------------------🧩 get top authors

export const getAuthorsByRating = async (req: Request, res: Response) => {
  try {
    const topAuthors = await Nft.aggregate([
      // Берём только проданные
      { $match: { sold: true } },

      // Сгруппировать по автору NFT
      {
        $group: {
          _id: "$authorId", // Группируем все NFT по значению поля author (то есть ObjectId автора)
          totalSales: { $sum: 1 }, // количество проданных NFT
          totalRevenue: { $sum: "$price" }, // сумма продаж
        },
      },
      // Присоединить информацию об авторе (из коллекции users)
      {
        $lookup: {
          from: "users", // коллекция, из которой подтягиваем данные (User)
          localField: "_id", //це _id, створений у $group, що містить authorId (це не поле в nft а змінена структура за допомогою $group)
          foreignField: "_id", // поле в user по которому устанавливаем связь из nft
          as: "authorData", //название нового объекта с данными
        },
      },
      //  Разворачиваем массив
      // { $unwind: "$authorData" },
      { $unwind: { path: "$authorData", preserveNullAndEmptyArrays: true } }, // без preserveNullAndEmptyArrays Mongo просто удалит массив, если массив пустой(например удалили пользователя)

      //  Можно выбрать нужные поля
      {
        $project: {
          _id: 0,
          authorId: "$_id",
          userName: "$authorData.userName",
          // якщо в юзера немає аватара, то встановлюємо в поле null (якщо не встановити, то в респонсі не буде поля avatar взагалі)
          avatar: { $ifNull: ["$authorData.avatar", null] },
          // avatar: "$authorData.avatar",
          totalSales: 1,
          totalRevenue: 1,
        },
      },
      // Сортировка по сумме или по количеству
      {
        $sort: { totalSales: -1 },
      },
      //  Лимитируем топ
      { $limit: 12 },
    ]);

    res.status(200).json({ message: "Top authors loaded", topAuthors });
  } catch (error) {
    handleControllerError(error, res, "Top authors loading error");
  }
};
