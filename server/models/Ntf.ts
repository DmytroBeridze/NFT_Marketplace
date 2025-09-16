import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

export interface INft {
  name?: string;
  imageUrl?: string;
  authorId?: mongoose.Types.ObjectId;
  galleryId?: mongoose.Types.ObjectId;
  price?: number;
  sold?: boolean;
}

// ✅ Тип документа (дані + методи документа .save()  .populate()
export type NftDocument = INft & Document;

export const NftSchema = new Schema<NftDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery",
    },
    price: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
NftSchema.index({ authorId: 1 });
export default mongoose.model<NftDocument>("Nft", NftSchema);
