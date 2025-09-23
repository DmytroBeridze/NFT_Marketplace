import { Request, Response } from "express";
import User from "../models/User";
import { log } from "console";
import { IRequest } from "../types/types";
import { handleControllerError } from "../utils/handleControllerError";

// interface IRequest extends Request {
//   userId?: string;
// }

export const theme = async (req: IRequest, res: Response) => {
  try {
    const userId = req.userId;
    const theme = req.cookies.theme;

    console.log(theme);

    if (!["light", "dark"].includes(theme)) {
      return res.status(400).json({ message: "Invalid theme" });
    }

    if (userId) {
      await User.findByIdAndUpdate(userId, { theme });
    }

    // res.cookie("theme", theme, {
    //   httpOnly: false,
    //   maxAge: 1000 * 60 * 60 * 24 * 30,
    //   sameSite: "lax",
    // });

    res.json({ message: "Theme updated", theme });
  } catch (error) {
    //  const errorMessage = "loginError";
    handleControllerError(error, res);

    // console.log(error);
    // res.status(500).json({ message: "Server error" });
  }
};
