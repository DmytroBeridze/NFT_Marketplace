import mongoose from "mongoose";
import { ICategory } from "../types/types";
const { Schema } = mongoose;

const CategoryShema = new Schema<ICategory>({
  name: {
    type: String,
    enum: [
      "Art",
      "Collectibles",
      "Music",
      "Photography",
      "Gaming",
      "Fantasy",
      "Sports",
      "Virtual Worlds",
    ],
  },
  order: Number,
});
export default mongoose.model<ICategory>("Category", CategoryShema);
