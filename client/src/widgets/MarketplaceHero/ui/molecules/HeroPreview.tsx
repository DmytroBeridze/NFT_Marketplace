import PlugImage from '../../../../shared/assets/images/plugImage.webp';
import UserPlug from '../../../../shared/assets/images/user_plug.png';
import { Image, Text } from '../../../../shared/ui/atoms';

import { NavLink } from 'react-router-dom';
import { useGetTopNftsQuery } from '../../model/topNftApi';
import { useRandomItem } from '../../lib';
import { Skeleton } from '../../../../shared/ui/atoms/Skeleton';

export const HeroPreview = () => {
  const { isError, isLoading, data } = useGetTopNftsQuery(10);
  // const isLoading = true;
  const items = data?.items || [];
  const { randomElement, updateRandom } = useRandomItem(items);

  const image = randomElement?.imageUrl || PlugImage;
  const avtar = randomElement?.imageUrl || UserPlug;

  if (isError) return <div>Error loading...</div>;

  return (
    <div
      className={`basis-1/2 w-full h-full 
     aspect-square  ${!isLoading ? 'bg-secondary-background-color shadow-secondary' : ''}  rounded-2xl
      flex flex-col  justify-center items-start overflow-clip
      `}

      //   className="basis-1/2 w-full h-full max-w-[519px]
      //  aspect-square bg-secondary-background-color rounded-2xl
      //   flex flex-col  justify-center items-start overflow-clip
      //   shadow-secondary"
    >
      {/* Картинка */}
      <Skeleton
        isLoading={isLoading}
        background={'skeleton-adaptive-background rounded-md w-full h-full'}
      />
      <div
        className=" w-full h-[80%] flex-1 overflow-hidden relative"
        onClick={updateRandom}
        // style={{
        //   backgroundImage: `url(${PlugImage})`,
        //   backgroundPosition: 'center',
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        // }}
      >
        {/* Prewiew */}

        {!isLoading ? (
          <Image
            alt={randomElement?.name || 'img'}
            src={image}
            height="h-full"
            width="w-full"
            objectFit="object-cover"
            objectPosition="object-center"
          />
        ) : null}
      </div>

      {/* Text */}
      <div className="padding-md-responsive   text-primary-text-color flex flex-col gap-2.5">
        {/* <div className="padding-10-20-responsive   text-primary-text-color flex flex-col gap-2.5"> */}

        <Skeleton
          isLoading={isLoading}
          Component="div"
          background={'skeleton-adaptive-background rounded-md w-40 h-6'}
        />
        <Text
          font="font-work-sans-semibold"
          className="heroContent-text-responsive relative"
        >
          {randomElement?.name}
        </Text>

        {/* Avatar */}
        <div className="flex gap-3 align-middle justify-start">
          <div className="h-6 w-6 rounded-full overflow-hidden ">
            <Skeleton
              isLoading={isLoading}
              Component="div"
              background={
                'skeleton-adaptive-background rounded-full w-full h-full'
              }
            />

            {!isLoading ? (
              <Image
                alt="img"
                src={avtar}
                height="h-full"
                width="w-full"
                objectFit="object-cover"
                objectPosition="object-center"
                className="rounded-full"
              />
            ) : null}
          </div>

          <NavLink
            to={'http://localhost:5173/rankings'}
            className="flex items-center"
          >
            <Skeleton
              isLoading={isLoading}
              background={'skeleton-adaptive-background rounded-md w-30 h-6'}
            />
            <Text className="font-work-sans-regular heroContent-author-responsive relative ">
              {randomElement?.authorId.userName}
            </Text>
          </NavLink>

          {/* <Text className="font-work-sans-regular responsive-size-sm">
            Animakid
          </Text> */}
        </div>
      </div>
    </div>
  );
};
// export const HeroPreview = () => {
//   return (
//     <div
//       className="basis-1/2 w-full h-full max-w-[519px]
//      aspect-square bg-secondary-background-color rounded-2xl
//       flex flex-col  ustify-center items-center overflow-clip"
//     >
//       <div className="max-h-[400px] h-full w-full max-w-[519px] flex-1 basis-1/2 ">
//         <img
//           src={PlugImage}
//           alt="rthrh"
//           className="w-full h-full object-cover object-center"
//         />
//       </div>

//       <div className="p-5 w-full min-h-[100px] flex-1 border border-amber-400">
//         {/* <div className="p-5 w-full h-[200px] flex-1 border border-amber-400"> */}
//         <Text font="font-work-sans-semibold" className="responsive-size-md">
//           Space Walking
//         </Text>
//       </div>
//     </div>
//   );
// };
