import { Request } from "express";

export type IRole = "USER" | "ADMIN" | "MODERATOR";
export type ICategory = {
  name:
    | "Art"
    | "Photography"
    | "Music"
    | "Gaming"
    | "Fantasy"
    | "Sports"
    | "Collectibles"
    | "Virtual Worlds";
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
