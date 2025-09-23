import { Response } from "express";

export const handleControllerError = (
  error: any,
  res: Response,
  errorText: string = "internalServerError",
  defaultStatus: number = 500
) => {
  console.error("Controller error:", error);

  return res.status(defaultStatus).json({ message: errorText });
};
