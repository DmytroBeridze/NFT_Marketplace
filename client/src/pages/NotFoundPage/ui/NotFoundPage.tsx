import { useNavigate } from 'react-router-dom';
import { Button, Text } from '../../../shared/ui/atoms';
import Moon from './decorations/Moon';
import Stars from './decorations/Stars';

export const NotFoundPage = () => {
  let navigate = useNavigate();

  return (
    <section
      className=" bg-primary-background-color h-[800px]  max-[1200px]:h-[600px]  max-[834px]:h-[450px] 
        relative 
      overflow-clip flex flex-col items-center justify-center "
    >
      <Stars />
      <Moon />
      {/* -----------------------Text */}
      <div
        className="z-10 text static-text-purple-color
       flex flex-col items-center justify-center px-2.5 mb-[86px] max-[1200px]:mb-[40px]"
      >
        <Text
          Element="h1"
          font="font-space-mono-bold"
          size="responsive-size-xxl"
          color="text-inherit"
          className="leading-none"
          // style={{ lineHeight: 'none' }}
        >
          404
        </Text>
        <Text
          Element="p"
          font="font-work-sans-regular"
          className="text-primary-text-color text-center "
          size="responsive-size-lg"
          // style={{ textAlign: 'center' }}
        >
          Oops, you’ve lost in space
        </Text>
        <Text
          Element="p"
          font="font-work-sans-regular"
          className="text-primary-text-color"
          size="responsive-size-md"
          style={{ textAlign: 'center' }}
        >
          We can’t find the page that you’re looking for
        </Text>
      </div>

      <Button
        className="py-5 px-[78px] z-10"
        radius="xl"
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>
    </section>
  );
};
