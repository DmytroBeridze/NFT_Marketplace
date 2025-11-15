import { Text } from '../../../../shared/ui/atoms';

export const CardNumber = () => {
  return (
    <Text
      font="font-space-mono-regular"
      size="t-text-sm"
      className="bg-primary-background-color w-[30px] h-[30px] 
      rounded-full flex items-center justify-center absolute top-5 left-5
      text-secondary-text-color"
    >
      1
    </Text>
  );
  //   return <div className="w-[30px] h-[30px] ">1</div>;
};
