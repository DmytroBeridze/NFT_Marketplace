import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar";
import Roles from "../models/Roles";
import { validationResult } from "express-validator";
import { IRequest } from "../types/types";
import { handleControllerError } from "../utils/handleControllerError";
import mongoose from "mongoose";
import Nft from "../models/Nft";

// interface IRequest extends Request {
//   userId?: string;
// }

// const JWT_SECRET = process.env.JWT_SECRET as string;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined in .env");
// }

//------------------🧩 Registration

export const register = async (req: Request, res: Response) => {
  try {
    const { userName, userPass, userMail, userType } = req.body;
    const isUsed = await User.findOne({ userName });
    const isUsedMail = await User.findOne({ userMail });
    // const role = await Roles.findOne("USER");
    const role = await Roles.findOne({ value: "USER" });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPass, salt);
    // const result = validationResult(req);

    if (isUsed) {
      return res.status(409).json({
        message: "usernameExists",
      });
    } else if (isUsedMail) {
      return res.status(409).json({ message: "mailExists" });
    }

    if (!role) {
      return res.status(500).json({ message: "roleNotFound" });
    }

    //! Валидируем не здесь а в authRouts.ts при помощи миддлвара checkValidation
    // if (!result.isEmpty()) {
    //   return res.status(400).json({ message: result.array()[0].msg });
    // }

    const newUser = new User({
      userName: userName,
      password: hash,
      userMail: userMail,
      userType: userType,
      roles: [role?._id],
    });

    await newUser.save();

    const { password: _, ...userData } = newUser.toObject();

    res.status(200).json({ userData, message: "registered" });
    // res.status(200).json({ newUser, message: "registered" });
  } catch (error) {
    const errorMessage = "registrationError";
    handleControllerError(error, res, errorMessage, 500);
    // console.error("Registration error:", error);
    // res.status(500).json({ message: "registrationError" });
    // res.status(500).json("User registration error");
  }
};

// ------------------------🧩 Login

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, userPass } = req.body;
    const user = await User.findOne({ userName }).populate("roles").lean(); //lean приводить до об'єкта інакше Mongoose поверне Document[] і його не можна перебрати мапом   при встановленні в токен
    const JWT_SECRET = getEnvVar("JWT_SECRET");
    // const result = validationResult(req);

    if (!user || !user.password) {
      return res.status(404).json({ message: "userNotFound" });
      // return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(userPass, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "incorrectPassword" });
      // return res.status(400).json({ message: "Incorrect password" });
    }

    //! Валидируем не здесь а в authRouts.ts при помощи миддлвара checkValidation
    // if (!result.isEmpty()) {
    //   return res.status(400).json({ message: result.array()[0].msg });
    // }

    const token = jwt.sign(
      {
        id: user._id,
        userType: user.userType,
        roles: user.roles.map((role: any) => role.value),
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    //💡 Щоб пароль не потрапив в респонс деструктуризуємо user
    //⚠️ Метод .toObject() конвертирует Mongoose-документ в обычный JavaScript-объект
    // const { password: _, ...userData } = user.toObject();

    const { password: _, ...userData } = user; //не треба user.toObject() тому що використовуємо lean() вище, який приводить до об'єкта user

    res.status(200).json({
      userData,
      token,
      message: "logged",
    });
    // res.status(200).json({
    //   userData,
    //   token,
    //   message: "You are logged",
    // });
  } catch (error) {
    const errorMessage = "loginError";
    handleControllerError(error, res, errorMessage, 500);

    // console.error("Login error:", error);
    // res.status(500).json({ message: "loginError" });
    // res.status(500).json({ message: "User Login error" });
  }
};

//--------------------------- 🧩 Get profile

//💡 id в req записує міддлвар коли перевіряє токен (він бере його з токена)
// ⚠️IRequest розштрює Response тому що в req записується id міддлваром в authRouts
export const getMe = async (req: IRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId)
      .populate("roles")
      .populate("gallery");
    if (!user || !user.password) {
      return res.status(404).json({ message: "userNotFound" });
      // return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ userData, message: "accessGranted" });
    // res.status(200).json({ userData, message: "Access granted" });
  } catch (error) {
    const errorMessage = "accessDenied";
    handleControllerError(error, res, errorMessage, 404);

    // console.error("Get user error:", error);
    // res.status(404).json({ message: "accessDenied" });
    // res.status(404).json("Access denied");
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
      return;

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

// admin token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjY5MWUxMjFkMDI2NjVkZThjMmFiNiIsInVzZXJUeXBlIjoiYXV0aG9yIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzYwOTk1MTQzLCJleHAiOjE3NjM1ODcxNDN9.AmG_xyAnVkmMyU3uVnm7GgpT5i20ewZpeBvKFSucMe8

// ----------------------
// ---------------------------------------------------------
// https://youtu.be/QxTeE5EMiWI?t=4665
