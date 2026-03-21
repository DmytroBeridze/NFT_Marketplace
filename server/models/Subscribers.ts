import mongoose from "mongoose";
const { Schema } = mongoose;

interface Subscriber {
  email: string;
}
const subscribersSchema = new Schema<Subscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Subscriber", subscribersSchema);
