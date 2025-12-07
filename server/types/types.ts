import { Request } from "express";

export type IRole = "USER" | "ADMIN" | "MODERATOR";
export type ICategory = {
  name:
    | "Art"
    | "Collectibles"
    | "Music"
    | "Photography"
    | "Gaming"
    | "Fantasy"
    | "Sports"
    | "Virtual Worlds";
  order: number;
};

// export interface IRole {
//   value: "USER" | "ADMIN" | "MODERATOR";
// }

export interface IRequest extends Request {
  userId?: string;
  roles?: IRole[];
  categoryId?: string;
}

export interface ImageRequest extends Request {
  file?: any;
  userId?: string;
}
