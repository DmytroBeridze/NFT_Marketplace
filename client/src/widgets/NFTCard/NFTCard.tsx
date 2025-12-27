import { useTranslation } from 'react-i18next';
import { Image, Text } from '../../shared/ui/atoms';
import { NavLink } from 'react-router-dom';

type NFTCardType = {
  src: string;
};

export const NFTCard = ({ src }: NFTCardType) => {
  const { t } = useTranslation('discoverMoreNFTs');
  return (
    <div
      className="  max-w-full rounded-2xl flex flex-col bg-secondary-background-color 
      overflow-hidden  text-primary-text-color"
    >
      <div className="w-full max-h-[295px] aspect-[400/295] overflow-hidden">
        <Image alt="test" src={src} />
      </div>

      {/* -------------------text */}
      <div className=" py-5 px-7  flex flex-col gap-5 ">
        <div>
          <Text
            children="Distant Galaxy"
            Element="h3"
            font="font-work-sans-semibold"
            size="t-text-md"
          />
          {/* --------------------icon */}
          <div className="flex gap-3 mt-1">
            <div className="max-w-[24px] max-h-[24px] rounded-full overflow-hidden  ">
              <Image alt="test" src={src} />
            </div>
            <Text
              children="MoonDancer"
              font="font-space-mono-regular"
              Element="span"
              size="t-text-sm"
            />
          </div>
        </div>
        {/* ------------------statistic */}
        <div className=" flex items-center justify-between">
          <div className="flex flex-col">
            <Text
              children={t('nftCard.price')}
              Element="span"
              font="font-space-mono-regular"
              size="t-text-xs"
              className="opacity-30"
            />
            <Text
              children="1.63 ETH"
              Element="span"
              font="font-space-mono-regular"
              size="t-text-ms"
            />
          </div>
          <div className="flex flex-col items-end">
            <Text
              children={t('nftCard.views')}
              Element="span"
              font="font-space-mono-regular"
              size="t-text-xs"
              className="opacity-30"
            />

            <Text
              children="10"
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
