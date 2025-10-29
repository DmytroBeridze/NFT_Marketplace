import mongoose from "mongoose";
const { Schema } = mongoose;

interface NftViewSchema {
  nft: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const nftViewSchema = new Schema<NftViewSchema>({
  nft: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nft",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
nftViewSchema.index({ nft: 1 });
nftViewSchema.index({ user: 1 });
export default mongoose.model<NftViewSchema>("NftView", nftViewSchema);
