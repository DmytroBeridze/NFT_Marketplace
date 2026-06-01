import { Request, Response } from "express";
import { handleControllerError } from "../utils/handleControllerError.js";

type ConfigType = {
  message: string;
  durations: readonly [8, 12, 24, 48];
  discounts: readonly [5, 10, 20, 30];
};
export const salesConfig = async (request: Request, res: Response) => {
  const SALES_DURATIONS = [8, 12, 24, 48] as const;
  const SALES_DISCOUNTS = [5, 10, 20, 30] as const;

  const config: ConfigType = {
    message: "Durations loaded",
    durations: SALES_DURATIONS,
    discounts: SALES_DISCOUNTS,
  };

  try {
    res.status(200).json(config);
  } catch (error) {
    return handleControllerError(error, res, "Durations failed");
  }
};
