import type { INft } from '../../../entities/nft/model';

export const mapNftToDiscountedCard = (nft: INft) => {
  return {
    imageUrl: nft.imageUrl,
    name: nft.name,
    sales: nft.sales,
    id: nft._id,

    userName: nft.authorId.userName,
    userId: nft.authorId._id,
    avatar: nft.authorId.avatar,
  };
};
