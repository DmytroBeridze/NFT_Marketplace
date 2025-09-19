import { Request } from "express";

export type IRole = "USER" | "ADMIN" | "MODERATOR";

// export interface IRole {
//   value: "USER" | "ADMIN" | "MODERATOR";
// }

export interface IRequest extends Request {
  userId?: string;
  roles?: IRole[];
}
export interface ImageRequest extends Request {
  file?: any;
  userId?: string;
}
