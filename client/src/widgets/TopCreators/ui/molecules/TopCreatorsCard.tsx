import { Avatar, Text } from '../../../../shared/ui/atoms';
import { CardNumber } from '../atoms';
import { useTranslation } from 'react-i18next';

import PlugImg from '../../../../shared/assets/images/plugImage.webp';

export const TopCreatorsCard = ({ index }: { index?: number }) => {
  const t = useTranslation('topCreators');
  return (
    <article
      className="bg-secondary-background-color 
      shadow-secondary rounded-2xl p-5 relative  col-auto flex 
      flex-col gap-5 items-center  aspect-square"
    >
      <CardNumber index={index || 0} />

      <Avatar
        className="w-[60%] h-[60%]"
        alt=""
        // src=""
        src="https://ichef.bbci.co.uk/news/480/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg.webp"
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

        <div className="flex flex-col items-center align-middle xl:flex-row xl:gap-2">
          <Text
            Element="span"
            color="text-secondary-text-color"
            font="font-work-sans-regular"
            size="responsive-size-xxs"
            className="text-center"
          >
            Total Sales:
          </Text>

          <Text
            Element="span"
            color="text-primary-text-color"
            font="font-space-mono-regular"
            size="responsive-size-xxs"
            className="text-center"
          >
            {'34.53 ETH'}
          </Text>
        </div>
      </div>
    </article>
  );
};
