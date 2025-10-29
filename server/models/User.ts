import mongoose from "mongoose";
import { IRoleDocument } from "./Roles";
const { Schema } = mongoose;

// interface
export interface IUser {
  userName: string;
  userMail: string;
  password: string;
  avatar: string;
  userType: "author" | "client";
  theme: "light" | "dark";
  roles: (mongoose.Types.ObjectId | IRoleDocument)[];
  gallery: mongoose.Types.ObjectId[];

  // posts: mongoose.Schema.Types.ObjectId[];
}

// schema
const UserSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    userMail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    userType: {
      type: String,
      required: true,

      enum: ["author", "client"],
    },
    theme: {
      type: String,
      default: "light",

      enum: ["light", "dark"],
    },
    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gallery",
      },
    ],
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles" }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
