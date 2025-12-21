import { Avatar, Text } from '../../../../shared/ui/atoms';
import { CardNumber } from '../atoms';
import { useTranslation } from 'react-i18next';

import type { Creator } from '../../../../entities/user/model';
import PlugImg from '../../../../shared/assets/images/plugImage.webp';
import { useNavigate } from 'react-router-dom';

interface TopCreatorsCardProps {
  author: Creator;
  index?: number;
}

export const TopCreatorsCard = ({ index, author }: TopCreatorsCardProps) => {
  let navigate = useNavigate();
  const { authorId, totalRevenue, totalSales, userName, avatar } = author;
  console.log(author);

  const { t } = useTranslation('topCreators');

  return (
    <article
      onClick={() => navigate(`/authorPage/${authorId}`)}
      className=" bg-secondary-background-color shadow-secondary
      rounded-2xl p-5 relative
      min-w-0 w-full
      lg:aspect-square  topCreatorsCard-responsive 
      cursor-pointer 
      hover:scale-95
      shadow-accent
      transition  duration-300 ease-in-out 
      "
    >
      {/* <article
      className="bg-secondary-background-color 
      shadow-secondary rounded-2xl p-5 relative  col-auto flex 
      flex-col gap-5 items-center  aspect-square"
    > */}
      <CardNumber index={index || 0} />

      <Avatar
        className="topCreatorsAvatar-responsive"
        alt=""
        src={avatar || null}
        // src="https://ichef.bbci.co.uk/news/480/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg.webp"
      />

      <div className=" topCreatorsInfo-responsive">
        <Text
          Element="h3"
          color="text-primary-text-color"
          font="font-work-sans-semibold"
          size="responsive-size-md"
        >
          {userName}
        </Text>

        <div className="flex flex-row gap-2">
          <Text
            Element="span"
            color="text-secondary-text-color"
            font="font-work-sans-regular"
            // size="responsive-size-xxs"
            className="text-center"
          >
            {t('totalSales')}
          </Text>

          <Text
            Element="span"
            color="text-primary-text-color"
            font="font-space-mono-regular"
            // size="responsive-size-xxs"
            className="text-center"
          >
            {totalSales}
          </Text>
        </div>
      </div>
    </article>
  );
};

// ------------------------------Skeleton

TopCreatorsCard.Skeleton = () => {
  return (
    <article
      className=" skeleton-adaptive-background shadow-secondary rounded-2xl p-5
  flex flex-col items-center gap-5
  min-w-0 w-full relative
  lg:aspect-square   animate-pulse inset-0 
   opacity-100 topCreatorsCard-responsive"
    >
      {/* <article
      className="bg-secondary-background-color 
      shadow-secondary rounded-2xl p-5 relative  col-auto flex 
      flex-col gap-5 items-center  aspect-square  animate-pulse inset-0  opacity-100"
    > */}
      {/* ---------------icon index  */}
      <div
        className="bg-primary-background-color w-[30px] h-[30px] 
      rounded-full  absolute top-5 left-5  "
      ></div>
      {/*---------------- avatar */}
      <div
        className="  object-cover rounded-full
         bg-primary-background-color 
       topCreatorsSkeletonAvatar-responsive
       
       "
      ></div>
      {/* <div className="w-[60%] h-[60%] rounded-full max-w-[120px] max-h-[120px] bg-primary-background-color"></div> */}

      <div
        className="flex flex-col items-center w-full gap-2 
        topCreatorsSkeletonInfo-responsive
    "
      >
        {/* --------------name */}
        <div className="bg-primary-background-color h-6 w-[80%]"></div>

        {/* --------------description */}
        <div
          className="w-full flex flex-row items-center  
        gap-2  xl:gap-2  
        "
        >
          <div className="h-6 w-[80%] bg-primary-background-color" />

          <div className="bg-primary-background-color h-6 w-[10%]"></div>
        </div>
      </div>
    </article>
  );
};
