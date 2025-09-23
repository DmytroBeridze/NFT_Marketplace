import { Request, Response } from "express";
import Category from "../models/Categories";
import { handleControllerError } from "../utils/handleControllerError";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error: any) {
    const errorMessage = "categoryNotFound";
    return handleControllerError(error, res, errorMessage, 400);

    // if (error.response) {
    //   return res
    //     .status(error.response.status)
    //     .json({ message: error.response.data });
    // }
    // return res.status(400).json({ message: error.message });
  }
};
