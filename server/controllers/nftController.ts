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
import Nft, { INft } from "../models/Ntf";
import mongoose from "mongoose";
import { IUser } from "../models/User";
import { IRequest } from "../types/role";

// type Roles = "USER" | "ADMIN";

// interface IRequest extends Request {
//   userId?: string;
//   roles?: Roles;
// }

// ---------------------------------🧩 get NFT
export const getNft = async (req: Request, res: Response) => {
  try {
    const { authorId, galleryId, sold, page = 1, limit = 12 } = req.query;

    //  фільтр
    const filter: Partial<INft> = {};
    // const filter: any = {};
    // перевірка
    if (authorId && mongoose.Types.ObjectId.isValid(authorId as string))
      filter.authorId = new mongoose.Types.ObjectId(authorId as string);
    if (galleryId && mongoose.Types.ObjectId.isValid(galleryId as string))
      filter.galleryId = new mongoose.Types.ObjectId(galleryId as string);

    if (sold !== undefined) filter.sold = sold === "true";

    // пагінація
    const skip = (Number(page) - 1) * Number(limit);

    //  запит з populate
    const ntfs = await Nft.find(filter)
      .populate("authorId", "userName userMail")
      .skip(skip)
      .limit(Number(limit));

    //   всього записів (для пагінації)
    const total = await Nft.countDocuments(filter);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
      items: ntfs,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// -------------------------------------🧩 set NFT
export const setNft = async (req: IRequest, res: Response) => {
  let { name, imageUrl, authorId, galleryId, price, sold } = req.body;

  // userId переданий міддлваром
  const userId = req.userId;

  try {
    const newItem: Partial<INft> = {
      name,
      imageUrl,
    };

    if (!name) return res.status(400).json({ message: "Name id required" });
    if (!imageUrl)
      return res.status(400).json({ message: "Image id required" });
    if (!price) return res.status(400).json({ message: "Price id required" });

    if (!userId) return res.status(401).json({ message: "No access" });

    newItem.authorId = new mongoose.Types.ObjectId(userId);

    //  Перевірка та конвертація authorId
    // if (authorId && mongoose.Types.ObjectId.isValid(authorId as string)) {
    //   newItem.authorId = new mongoose.Types.ObjectId(authorId as string);
    // } else {
    //   return res.status(400).json({ error: "Invalid authorId" });
    // }

    //  Перевірка та конвертація galleryId
    if (galleryId && mongoose.Types.ObjectId.isValid(galleryId as string)) {
      newItem.galleryId = new mongoose.Types.ObjectId(galleryId as string);
    }

    //  Приведення типів
    if (price !== undefined) newItem.price = Number(price);
    if (sold !== undefined) {
      newItem.sold = sold === "true" || sold === true;
      // if (sold === "true" || sold === true) newItem.sold = true;
      // if (sold === "false" || sold === false) newItem.sold = false;
    }

    //  Створюємо новий документ
    const nft = new Nft(newItem);

    //  Зберігаємо у БД
    await nft.save();

    res.status(201).json({ message: "item added", item: nft });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// ------------------------------🧩 patch NFT
export const patchNft = async (req: IRequest, res: Response) => {
  try {
    const { name, imageUrl, galleryId, price } = req.body;
    const { id } = req.params; // id NFT з URL

    // знаходимо nft
    const nft = await Nft.findById(id);
    if (!nft) return res.status(404).json({ message: "NFT not found" });

    // перевіряємо чи існує  id NFT з параметрів
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid NFT ID" });
    }

    //  перевіряємо  співвідношення authorId з nft та userId з міддлвар
    if (nft.authorId?.toString() !== req.userId) {
      return res.status(403).json({ message: "No access" });
    }

    const updateData: Partial<INft> = {};
    if (name !== undefined) updateData.name = name;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (price !== undefined) updateData.price = price;

    if (galleryId === null) {
      updateData.galleryId = undefined;
    }
    if (galleryId && mongoose.Types.ObjectId.isValid(galleryId as string)) {
      updateData.galleryId = new mongoose.Types.ObjectId(galleryId as string);
    }
    // патчимо дані
    const updatedNft = await Nft.findByIdAndUpdate(id, updateData, {
      new: true, // вертаємо вже оновлений документ
      runValidators: true, // mongoose перевірить дані за схемою навіть при update
    });

    res.status(200).json({ message: "Element changed", item: updatedNft });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
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
      return res.status(400).json({ message: "Invalid NFT ID" });
    }

    const nft = await Nft.findById(id);

    if (!nft) return res.status(404).json({ message: "NFT not found" });

    //перевіряємо якщо юзер з nft не співпадає з юзером з req або якщо роль не ADMIN
    if (nft.authorId?.toString() !== userId && !req.roles?.includes("ADMIN")) {
      return res.status(403).json({ message: "No access" });
    }

    await nft.deleteOne();
    // const deletedNft = await Nft.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "NFT deleted", item: nft.toObject() }); //вертаємо перетворюючи в об'єкт щоб забрати службові поля
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
