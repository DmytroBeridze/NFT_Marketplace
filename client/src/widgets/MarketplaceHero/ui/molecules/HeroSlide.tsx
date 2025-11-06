import { Skeleton } from '../../../../shared/ui/atoms/Skeleton';
import { NavLink } from 'react-router-dom';
import { Image, Text } from '../../../../shared/ui/atoms';
import type { INft } from '../../../../entities/nft/model';

import PlugImage from '../../../../shared/assets/images/plugImage.webp';
import UserPlug from '../../../../shared/assets/icons/user_plug.svg';

interface HeroSlideProps {
  nft: INft;
  isLoading: boolean;
}

export const HeroSlide = ({ nft, isLoading }: HeroSlideProps) => {
  const avatar = nft.authorId.avatar ?? UserPlug;
  const image = nft.imageUrl ?? PlugImage;

  return (
    <div
      className={` w-full h-full
                aspect-square  ${!isLoading ? 'bg-secondary-background-color ' : ''}  rounded-2xl
            flex flex-col  justify-center items-start overflow-clip
            `}
    >
      <Skeleton
        isLoading={isLoading}
        background={'skeleton-adaptive-background rounded-md w-full h-full'}
      />
      <div
        className=" w-full h-[80%] flex-1 overflow-hidden relative "
        // onClick={updateRandom}
      >
        {!isLoading ? (
          <Image
            alt={nft?.name || 'img'}
            src={image}
            height="h-full"
            width="w-full"
            objectFit="object-cover"
            objectPosition="object-center"
          />
        ) : null}
      </div>

      <div className="padding-md-responsive   text-primary-text-color flex flex-col gap-2.5">
        <Skeleton
          isLoading={isLoading}
          Component="div"
          background={'skeleton-adaptive-background rounded-md w-40 h-6'}
        />
        {!isLoading && (
          <Text
            font="font-work-sans-semibold"
            className="heroContent-text-responsive relative"
          >
            {nft?.name}
          </Text>
        )}

        <div className="flex gap-3 align-middle justify-start">
          <div className="h-6 w-6 rounded-full overflow-hidden ">
            <Skeleton
              isLoading={isLoading}
              Component="div"
              background={
                'skeleton-adaptive-background rounded-full w-full h-full'
              }
            />
            {!isLoading && (
              <Image
                alt="img"
                src={avatar}
                height="h-full"
                width="w-full"
                objectFit="object-cover"
                objectPosition="object-center"
                className="rounded-full "
              />
            )}
            {/* {!isLoading ? (
              <Image
                alt="img"
                src={avatar}
                height="h-full"
                width="w-full"
                objectFit="object-cover"
                objectPosition="object-center"
                className="rounded-full "
              />
            ) : null} */}
          </div>

          <NavLink to={'/rankings'} className="flex items-center">
            <Skeleton
              isLoading={isLoading}
              background={'skeleton-adaptive-background rounded-md w-30 h-6'}
            />
            {!isLoading && (
              <Text className="font-work-sans-regular heroContent-author-responsive relative ">
                {nft?.authorId.userName}
              </Text>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
