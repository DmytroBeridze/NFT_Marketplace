import { Request, Response } from "express";
import UserSchema from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//------------------Registration
export const register = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const isUsed = await UserSchema.findOne({ userName });

    if (isUsed) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new UserSchema({
      userName: userName,
      password: hash,
    });

    await newUser.save();

    res.status(200).json({ newUser, message: "User is registered" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json("User registration error");
  }
};

// ------------------------Login

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await UserSchema.findOne({ userName });
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env");
    }

    if (!user || !user.password) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );
    // Щоб пароль не потрапив в респонс деструктуризуємо user
    // Метод .toObject() конвертирует Mongoose-документ в обычный JavaScript-объект
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      userData,
      token,
      message: "You are logged",
    });
  } catch (error) {
    console.log(error);
  }
};

// Get profile
export const getMe = async (req: Request, res: Response) => {
  try {
    await console.log("Login");
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------------------
// https://youtu.be/QxTeE5EMiWI?t=4011
