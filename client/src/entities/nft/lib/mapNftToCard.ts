import type { INft } from '../model';

export const mapNftToCard = (nft: INft) => {
  return {
    id: nft._id,
    src: nft.imageUrl,
    name: nft.name,
    price: nft.price,
    views: nft.views,
    userName: nft.authorId.userName,
    avatar: nft.authorId.avatar,
  };
};
