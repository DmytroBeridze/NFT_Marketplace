import PlugImage from '../../../../shared/assets/images/plugImage.png';

import { Text } from '../../../../shared/ui/atoms/Text';
import { Image } from '../../../../shared/ui/atoms/Image/Image';
import { NavLink } from 'react-router-dom';

export const HeroPreview = () => {
  return (
    <div
      className="basis-1/2 w-full h-full max-w-[519px]
     aspect-square bg-secondary-background-color rounded-2xl
      flex flex-col  justify-center items-start overflow-clip
      shadow-secondary"
    >
      {/* Картинка */}
      <div
        className=" w-full h-[80%] flex-1 overflow-hidden"
        // style={{
        //   backgroundImage: `url(${PlugImage})`,
        //   backgroundPosition: 'center',
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        // }}
      >
        {/* Prewiew */}

        <Image
          alt="plug"
          src={PlugImage}
          height="h-full"
          width="w-full"
          objectFit="object-cover"
          objectPosition="object-center"
        />
      </div>

      {/* Text */}
      <div className="padding-10-20-responsive   text-primary-text-color flex flex-col gap-2.5">
        {/* <div className="p-5 h-[21%]  text-primary-text-color flex flex-col gap-2.5"> */}
        <Text font="font-work-sans-semibold" className="responsive-size-md">
          Space Walking
        </Text>

        {/* Avatar */}
        <div className="flex gap-3 align-middle justify-start">
          <Image
            alt="plug"
            src={PlugImage}
            height="max-h-[24px]"
            width="max-w-[24px]"
            objectFit="object-cover"
            objectPosition="object-center"
            className="rounded-full"
          />

          <NavLink
            to={'http://localhost:5173/rankings'}
            className="flex items-center"
          >
            <Text className="font-work-sans-regular responsive-size-sm ">
              Animakid
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
