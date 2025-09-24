import { Text } from '../../../../shared/ui/atoms/Text';
import PlugImage from '../../../../shared/assets/images/plugImage.png';

export const HeroPreview = () => {
  return (
    <div className="aspect-square basis-1/2 w-full max-w-[519px] bg-secondary-background-color rounded-2xl flex flex-col overflow-hidden">
      {/* Картинка */}
      <div className="flex-1 w-full">
        <img
          src={PlugImage}
          alt="Preview"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Текст */}
      <div className="p-5 w-full">
        <Text font="font-work-sans-semibold" className="responsive-size-md">
          Space Walking
        </Text>
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
