import mongoose from "mongoose";
import { IRole } from "../types/role";

const { Schema } = mongoose;

// interface IRole {
//   value: "USER" | "ADMIN" | "MODERATOR";
// }

const RoleSchema = new Schema({
  value: {
    type: String,
    unique: true,
    required: true,
    default: "USER",
    enum: ["USER", "ADMIN", "MODERATOR"],
  },
});
export default mongoose.model("Roles", RoleSchema);

// const RoleSchema = new Schema<IRole>({
//   value: {
//     type: String,
//     unique: true,
//     required: true,
//     default: "USER",
//     enum: ["USER", "ADMIN", "MODERATOR"],
//   },
// });
// export default mongoose.model<IRole>("Roles", RoleSchema);
