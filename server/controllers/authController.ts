import { Request, Response } from "express";
import UserSchema from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar";
import Roles from "../models/Roles";
import { validationResult } from "express-validator";

interface IRequest extends Request {
  userId?: string;
}

// const JWT_SECRET = process.env.JWT_SECRET as string;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined in .env");
// }
//------------------Registration

export const register = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const isUsed = await UserSchema.findOne({ userName });
    const role = await Roles.findOne({ value: "USER" });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const result = validationResult(req);

    if (isUsed) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    if (!role) {
      return res
        .status(500)
        .json({ message: "Role USER not found in database" });
    }

    //! Валидируем не здесь а в authRouts.ts при помощи миддлвара checkValidation
    // if (!result.isEmpty()) {
    //   return res.status(400).json({ message: result.array()[0].msg });
    // }

    const newUser = new UserSchema({
      userName: userName,
      password: hash,
      roles: [role?._id],
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
    const user = await UserSchema.findOne({ userName }).populate("roles");
    const JWT_SECRET = getEnvVar("JWT_SECRET");
    const result = validationResult(req);

    if (!user || !user.password) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    //! Валидируем не здесь а в authRouts.ts при помощи миддлвара checkValidation
    // if (!result.isEmpty()) {
    //   return res.status(400).json({ message: result.array()[0].msg });
    // }

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
    console.error("Login error:", error);
    res.status(500).json("User Login error");
  }
};

//--------------------------- Get profile

export const getMe = async (req: IRequest, res: Response) => {
  try {
    const user = await UserSchema.findById(req.userId).populate("roles");
    if (!user || !user.password) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ userData, message: "Access granted" });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(404).json("Access denied");
  }
};

// ---------------------------------------------------------
// https://youtu.be/QxTeE5EMiWI?t=4665
