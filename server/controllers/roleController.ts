import { Request, Response } from "express";
import Roles from "../models/Roles";
import { handleControllerError } from "../utils/handleControllerError";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (error: any) {
    const errorMessage = "roleNotFound";
    return handleControllerError(error, res, errorMessage, 400);

    // return handleControllerError(error, res);
  }
};
