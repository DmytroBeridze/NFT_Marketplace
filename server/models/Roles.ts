import mongoose, { Document } from "mongoose";
import { IRole } from "../types/types";

const { Schema } = mongoose;

export interface IRoleDocument extends Document {
  value: IRole;
}

// interface IRole {
//   value: "USER" | "ADMIN" | "MODERATOR";
// }

// const RoleSchema = new Schema({
//   value: {
//     type: String,
//     unique: true,
//     required: true,
//     default: "USER",
//     enum: ["USER", "ADMIN", "MODERATOR"],
//   },
// });
// export default mongoose.model("Roles", RoleSchema);

const RoleSchema = new Schema<IRoleDocument>({
  value: {
    type: String,
    unique: true,
    required: true,
    default: "USER",
    enum: ["USER", "ADMIN", "MODERATOR"],
  },
});
export default mongoose.model<IRoleDocument>("Roles", RoleSchema);
