import mongoose from "mongoose";
const { Schema } = mongoose;

// interface
interface IUser {
  userName: string;
  password: string;
  roles: mongoose.Types.ObjectId[];

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
    password: {
      type: String,
      required: true,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles" }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
