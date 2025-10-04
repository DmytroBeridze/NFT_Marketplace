import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

interface IGallery {
  name: string;
  cover?: string;
  author: mongoose.Types.ObjectId;
}

const gallerySchema = new Schema<IGallery>(
  {
    name: {
      type: String,
    },
    cover: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
gallerySchema.index({ author: 1 });
export default mongoose.model("Gallery", gallerySchema);
