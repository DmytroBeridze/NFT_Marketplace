import mongoose from "mongoose";
import { IRoleDocument } from "./Roles.js";
const { Schema } = mongoose;

// interface

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  telegram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

export interface IUser {
  userName: string;
  userMail: string;
  password: string;
  avatar?: string;
  avatarDeleteUrl?: string;
  coverImage?: string;
  coverImageDeleteUrl?: string;
  bio?: string;
  userType: "author" | "client";
  theme: "light" | "dark";
  roles: (mongoose.Types.ObjectId | IRoleDocument)[];
  socialLinks?: SocialLinks;
  // gallery: mongoose.Types.ObjectId[];

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
    avatarDeleteUrl: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    coverImageDeleteUrl: {
      type: String,
    },
    userType: {
      type: String,
      required: true,

      enum: ["author", "client"],
    },
    bio: {
      type: String,
    },
    theme: {
      type: String,
      default: "light",

      enum: ["light", "dark"],
    },
    socialLinks: {
      type: {
        instagram: { type: String },
        facebook: { type: String },
        telegram: { type: String },
        twitter: { type: String },
        youtube: { type: String },
        website: { type: String },
      },
      default: {},
    },

    // gallery: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Gallery",
    //   },
    // ],
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles" }],
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", UserSchema);
