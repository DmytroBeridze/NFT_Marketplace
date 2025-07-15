import mongoose from "mongoose";
const { Schema } = mongoose;

// interface
interface IUser {
  userName: string;
  password: string;
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
    // posts: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Post",
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
