import mongoose from "mongoose";
import { ICategory } from "../types/types";
const { Schema } = mongoose;

const CategoryShema = new Schema({
  name: {
    type: String,
    enum: [
      "Art",
      "Photography",
      "Music",
      "Gaming",
      "Fantasy",
      "Sports",
      "Collectibles",
      "Virtual Worlds",
    ],
  },
});
export default mongoose.model<ICategory>("Category", CategoryShema);
