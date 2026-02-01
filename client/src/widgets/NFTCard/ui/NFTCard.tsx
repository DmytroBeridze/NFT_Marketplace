import { useTranslation } from 'react-i18next';
import { Image, Text } from '../../../shared/ui/atoms';
import avatarPlaceholder from '../../../shared/assets/icons/User_plug.svg';
// import avatarPlaceholder from '../../shared/assets/icons/User_plug.svg';
import { NavLink } from 'react-router-dom';
import type { NFTCardType } from '../model/types';
import { LazyImage } from '../../../shared/ui/atoms/LazyImage';

export const NFTCard = ({
  id,
  src,
  name,
  price,
  userName,
  avatar,
  views = 0,
}: NFTCardType) => {
  const { t } = useTranslation('discoverMoreNFTs');
  return (
    <div
      className="  max-w-full rounded-2xl flex flex-col bg-secondary-background-color 
      overflow-hidden  text-primary-text-color"
    >
      {/* ----------------------image */}
      <div className="w-full max-h-[295px] aspect-[400/295] overflow-hidden">
        <LazyImage alt={name} src={src} className=" max-h-[295px]" />
        {/* <Image alt={name} src={src} /> */}
      </div>

      <div className=" py-5 px-7  flex flex-col gap-5 ">
        <div>
          {/* -------------------name */}

          <NavLink to={`/rankings/${id}`} className="cursor-auto">
            <Text
              children={name}
              Element="h3"
              font="font-work-sans-semibold"
              size="t-text-md"
              className="nft-name w-fit cursor-pointer duration-300"
            />
          </NavLink>
          {/* --------------------icon */}
          <div className="flex gap-3 mt-1">
            <div className="max-w-[24px] max-h-[24px] rounded-full overflow-hidden  ">
              <Image alt="test" src={avatar || avatarPlaceholder} />
            </div>
            <Text
              children={userName}
              font="font-space-mono-regular"
              Element="span"
              size="t-text-sm"
            />
          </div>
        </div>
        {/* ------------------statistic */}
        <div className=" flex items-center justify-between">
          {/* price */}
          <div className="flex flex-col">
            <Text
              children={t('nftCard.price')}
              Element="span"
              font="font-space-mono-regular"
              size="t-text-xs"
              className="opacity-30"
            />
            <Text
              children={`${price} ETH`}
              Element="span"
              font="font-space-mono-regular"
              size="t-text-ms"
            />
          </div>
          {/* views */}
          <div className="flex flex-col items-end">
            <Text
              children={t('nftCard.views')}
              Element="span"
              font="font-space-mono-regular"
              size="t-text-xs"
              className="opacity-30"
            />

            <Text
              children={views}
              Element="span"
              font="font-space-mono-regular"
              size="t-text-ms"
              className="justify-self-end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --------------------skeleton
NFTCard.Skeleton = () => {
  return (
    <div
      data-testid="NFTCard-skeleton"
      className="  max-w-full rounded-2xl flex flex-col skeleton-adaptive-background  
      overflow-hidden  text-primary-text-color animate-pulse shadow-secondary"
    >
      {/* ----------------------image */}
      <div
        className="w-full max-h-[295px] aspect-[400/295] 
       skeleton-adaptive-background"
      ></div>

      <div className=" py-5 px-7  flex flex-col gap-5 bg-primary-background-color">
        {/* -------------------name */}

        <div className="skeleton-adaptive-background w-[70%] h-5"></div>
        {/* --------------------icon */}

        <div className="flex gap-3 items-center">
          <div className="w-[24px] h-[24px] rounded-full overflow-hidden  skeleton-adaptive-background"></div>
          <div className="w-[40%] h-5 skeleton-adaptive-background"></div>
        </div>

        {/* ------------------statistic */}
        <div className=" flex items-center justify-between ">
          {/* price */}
          <div className="w-20 h-5 skeleton-adaptive-background"></div>
          {/* views */}
          <div className="w-10 h-5 skeleton-adaptive-background"></div>
        </div>
      </div>
    </div>
  );
};
