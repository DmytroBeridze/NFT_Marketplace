import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

export interface ISales {
  isActive?: boolean;
  percent?: number;
  startAt?: Date;
  endAt?: Date;
}

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

  sales?: ISales;
}

const SalesSchema = new Schema<ISales>(
  {
    isActive: { type: Boolean, default: false },
    percent: { type: Number, min: 1, max: 90 },
    startAt: { type: Date },
    endAt: { type: Date },
  },
  {
    _id: false,
  },
);

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
    sales: {
      type: SalesSchema,
      default: null,
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
  { timestamps: true },
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

// ----------знижка
NftSchema.virtual("isSaleActive").get(function () {
  if (!this.sales) return false;

  const now = new Date();
  const { isActive, startAt, endAt } = this.sales;

  if (!isActive) return false;
  if (!startAt) return false;
  if (endAt && now > endAt) return false;

  return true;
});
NftSchema.set("toJSON", { virtuals: true });
NftSchema.set("toObject", { virtuals: true });

// NftSchema.index({ keywords: "text" });
export default mongoose.model<NftDocument>("Nft", NftSchema);
