import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

export interface INft {
  name?: string;
  description?: string;
  authorId?: mongoose.Types.ObjectId;
  gallery?: mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId;
  price?: number;
  sold?: boolean;
  imageUrl?: string;
  deleteImageUrl?: string;
  keywords?: string[];

  likes?: mongoose.Types.ObjectId[];
  views?: number;
  rating?: number;
}

// ✅ Тип документа (дані + методи документа .save()  .populate()
export type NftDocument = INft & Document;

export const NftSchema = new Schema<NftDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    deleteImageUrl: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gallery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },

    keywords: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 2,
        message: "Need add at least three keywords",
      },
    },
  },
  { timestamps: true }
);
NftSchema.index({ authorId: 1 });
NftSchema.index({ keywords: 1 });
NftSchema.index({ category: 1 });
NftSchema.index({ gallery: 1 });
NftSchema.index({ rating: 1 });

NftSchema.pre("save", function (next) {
  const likesCount = this.likes?.length || 0;
  const viewsCount = this.views || 0;
  this.rating = likesCount * 2 + viewsCount * 0.5;

  next();
});

// NftSchema.index({ keywords: "text" });
export default mongoose.model<NftDocument>("Nft", NftSchema);
