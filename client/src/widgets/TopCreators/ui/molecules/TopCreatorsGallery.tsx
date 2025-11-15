import PlugImg from '../../../../shared/assets/images/plugImage.webp';
import { Avatar, Text } from '../../../../shared/ui/atoms';
import { CardNumber } from '../atoms';

import { useTranslation } from 'react-i18next';

export const TopCreatorsGallery = () => {
  const t = useTranslation('topCreators');
  return (
    <div className="grid grid-cols-4 gap-7">
      {/* --------------- */}
      <article
        className="bg-secondary-background-color 
      shadow-secondary rounded-2xl p-5 relative  col-auto flex 
      flex-col gap-5 items-center  aspect-square"
      >
        <CardNumber index={1} />
        <Avatar
          alt=""
          src=""
          // src="https://ichef.bbci.co.uk/news/480/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg.webp"
        />

        <div className="flex flex-col items-center">
          <Text
            Element="h3"
            color="text-primary-text-color"
            font="font-work-sans-semibold"
            size="responsive-size-md"
          >
            Keepitreal
          </Text>
          <Text
            Element="p"
            color="text-secondary-text-color"
            font="font-work-sans-regular"
            size="responsive-size-sm"
          >
            Total Sales:
            <span className="text-primary-text-color font-space-mono-regular">
              {'34.53 ETH'}
            </span>
          </Text>
        </div>
      </article>
      {/* ------------- */}
      <article
        className="  bg-secondary-background-color 
      shadow-secondary rounded-2xl"
      >
        sfdghdrtjh
      </article>
      <article
        className=" bg-secondary-background-color 
      shadow-secondary rounded-2xl"
      >
        sfdghdrtjh
      </article>
      <article
        className="  bg-secondary-background-color 
      shadow-secondary rounded-2xl"
      >
        sfdghdrtjh
      </article>
    </div>
  );
};
