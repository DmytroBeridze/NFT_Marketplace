import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
  next();
};
