import { Response } from "express";
import { IRequest } from "../types/types";
import { handleControllerError } from "../utils/handleControllerError";

type StatsRequest = Omit<IRequest, "categoryId">;
// interface StatsRequest extends Omit<IRequest, "categoryId"> {}

export const updateStats = (req: StatsRequest, res: Response) => {
  const { userId, roles } = req; //міддлвар
  const { nftId } = req.params;
  if (!userId) return res.status(400);

  console.log(userId, roles);

  res.status(200).json({ message: "Nfs updated" });
  try {
  } catch (error) {
    const errorMessage = "Nfs not updated";
    handleControllerError(error, res, errorMessage);
  }
};
