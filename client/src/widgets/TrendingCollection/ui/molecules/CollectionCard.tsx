import { Image, Text } from '../../../../shared/ui/atoms';
import plugImg from '../../../../shared/assets/images/plugImage.png';
import plugAvatar from '../../../../shared/assets/images/user_plug.png';
import type { TrendingNft } from '../../../../entities/nft/model';

interface CollectionCardProps {
  author: string;
  authorAvatar: string;
  name: string;
  nftsQuantity: number;
  nfts: TrendingNft[];
}

export const CollectionCard = ({
  name,
  author,
  authorAvatar,
  nftsQuantity,
  nfts,
}: CollectionCardProps) => {
  console.log(nfts);

  return (
    <article className="  grid grid-cols-3 gap-3.5">
      {nfts.map((nft) => (
        <div className="aspect-square col-start-1 col-end-4 rounded-[20px] overflow-hidden ">
          <Image alt="avatar" src={plugImg} />
        </div>
      ))}

      {/* <div className="aspect-square col-start-1 col-end-4 rounded-[20px] overflow-hidden ">
        <Image alt="avatar" src={plugImg} />
      </div>
      <div className="aspect-square rounded-[20px] overflow-hidden ">
        <Image alt="avatar" src={plugImg} />
      </div>
      <div className="aspect-square rounded-[20px] overflow-hidden ">
        <Image alt="avatar" src={plugImg} />
      </div> */}
      <div className="aspect-square rounded-[20px] overflow-hidden bg-primary-accent-color flex items-center justify-center ">
        <Text
          font="font-space-mono-bold"
          size="t-text-md"
          color="static-text-white-color"
        >
          {nftsQuantity}
        </Text>
      </div>

      {/* info */}
      <div className=" col-start-1 col-end-4  flex flex-col gap-2.5 ">
        <Text
          Element="h3"
          font="font-work-sans-semibold"
          size="t-text-md"
          color="text-primary-text-color"
        >
          {name}
        </Text>
        <div className="flex items-center gap-3">
          <Image
            alt="avatar"
            width="w-[24px]"
            height="h-[24px]"
            src={authorAvatar}
            className="rounded-full"
          />

          <Text
            Element="span"
            font="font-work-sans-regular"
            size="t-text-sm"
            color="text-primary-text-color"
          >
            {author}
          </Text>
        </div>
      </div>
    </article>
  );
};
