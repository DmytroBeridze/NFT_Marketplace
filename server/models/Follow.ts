import mongoose from "mongoose";
const { Schema } = mongoose;

const FollowSchema = new Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

FollowSchema.index({ followerId: 1, authorId: 1 }, { unique: true });

export default mongoose.model("Follow", FollowSchema);
