import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar";

interface IRequest extends Request {
  userId?: string;
}

export const checkAuth = (req: IRequest, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (token) {
    try {
      const JWT_SECRET = getEnvVar("JWT_SECRET");
      // const JWT_SECRET = process.env.JWT_SECRET;
      // if (!JWT_SECRET) {
      //   throw new Error("JWT_SECRET is not defined in .env");
      // }

      const decoded = jwt.verify(token, JWT_SECRET);

      if (typeof decoded === "object" && "id" in decoded) {
        const userId = (decoded as JwtPayload).id as string;

        req.userId = userId;
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "No access token" });
    }
  } else {
    return res.status(401).json({ message: "No access token" });
  }
};
