import { Image, Text } from '../../../../shared/ui/atoms';
import fallbackImage from '../../../../shared/assets/images/plugImage.webp';
// import plugImg from '../../../../shared/assets/images/plugImage.png';
import plugAvatar from '../../../../shared/assets/images/user_plug.png';
import type { TrendingNft } from '../../../../entities/nft/model';
import { memo, type ReactNode } from 'react';
import { quantityFormatter } from '../../../../shared/lib/formatters';
import { NavLink } from 'react-router-dom';

interface CollectionCardProps {
  galleryId: string;
  author: string;
  authorAvatar: string;
  name: string;
  nftsQuantity: number;
  nfts: TrendingNft[];
}

const CollectionCardComponent = ({
  galleryId,
  name,
  author,
  authorAvatar,
  nftsQuantity,
  nfts,
}: CollectionCardProps) => {
  const mainPreview = nfts[0]?.imageUrl ?? fallbackImage;
  const mainAltImg = nfts[0]?.name ?? 'main img';

  const previewImages = Array.from({ length: 2 }, (_, i) => {
    const nft = nfts[i + 1];
    return {
      alt: nft?.name ?? 'NFT',
      img: nft?.imageUrl ?? fallbackImage,
      id: nft?._id ?? `preview-${i}`,
    };
  });

  // const previewImages = [
  //   { alt: nfts[1]?.name, img: nfts[1]?.imageUrl, id: nfts[1]?._id },
  //   { alt: nfts[2]?.name, img: nfts[2]?.imageUrl, id: nfts[2]?._id },
  // ];

  return (
    <article className="  grid grid-cols-3 gap-3.5">
      {/* main img */}
      <div className="aspect-square col-start-1 col-end-4 rounded-[20px] overflow-hidden shadow-primary">
        <Image alt={mainAltImg} src={mainPreview} />
      </div>
      {/*------------------------ preview imgs */}
      {previewImages.map(({ alt, img, id }) => (
        <div
          key={id}
          className="aspect-square  overflow-hidden shadow-primary trending-preview-responsive"
          // className="aspect-square rounded-[20px] overflow-hidden shadow-primary"
        >
          <Image alt={alt} src={img} />
        </div>
      ))}

      <NavLink
        to={`collection/${galleryId}`}
        className="aspect-square rounded-[20px] overflow-hidden 
      bg-primary-accent-color flex items-center justify-center shadow-primary
       trending-preview-responsive"
      >
        <Text
          font="font-space-mono-bold"
          // size="t-text-md"
          color="static-text-white-color"
          className="trending-quantity-responsive"
        >
          {quantityFormatter(nftsQuantity, 1025)}
          {/* {nftsQuantity} */}
        </Text>
      </NavLink>

      {/*--------------- info */}
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
            src={authorAvatar || plugAvatar}
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

/*
memo(CollectionCardComponent) вертає тип MemoExoticComponent<...> в ньому немає поля Skeleton
за допомогою as unknown просимо забути про тип значення
та за допомогою as CollectionCardType приводимо до свого типу 
*/
type CollectionCardType = typeof CollectionCardComponent & {
  Skeleton: () => ReactNode;
};

export const CollectionCard = memo(
  CollectionCardComponent,
) as unknown as CollectionCardType;

// ----------skeleton
CollectionCard.Skeleton = () => {
  return (
    <article className="  grid grid-cols-3 gap-3.5">
      {/* main img */}
      <div className="aspect-square col-start-1 col-end-4 rounded-[20px] overflow-hidden  animate-pulse inset-0  opacity-100 skeleton-adaptive-background"></div>
      {/* preview imgs */}
      {[1, 2, 3].map((_, id) => (
        <div
          key={id}
          className="aspect-square rounded-[20px] overflow-hidden   animate-pulse inset-0  opacity-100 skeleton-adaptive-background"
        ></div>
      ))}

      {/* ----------------------------info */}
      <div className=" col-start-1 col-end-4  flex flex-col gap-2.5 ">
        <div className="max-w-[200px] h-[20px]  animate-pulse inset-0  opacity-100 skeleton-adaptive-background"></div>
        <div className="flex items-center gap-3">
          <div className="rounded-full w-[24px] h-[24px]   animate-pulse inset-0  opacity-100 skeleton-adaptive-background"></div>
          <div className="w-[30%] h-[20px]   animate-pulse inset-0  opacity-100 skeleton-adaptive-background"></div>
        </div>
      </div>
    </article>
  );
};
