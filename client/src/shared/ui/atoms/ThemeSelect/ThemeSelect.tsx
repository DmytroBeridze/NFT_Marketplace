import { Switch } from '@headlessui/react';
import { BsSunFill } from 'react-icons/bs';
import { WiMoonWaningCrescent2 } from 'react-icons/wi';
import { useTheme } from '../../../lib/theme/useTheme';

interface ThemeSelectProps {
  bgColor?: string;
}

export const ThemeSelect = ({ bgColor }: ThemeSelectProps) => {
  const { toggleTheme, theme } = useTheme();

  const themeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleTheme();
  };
  console.log(bgColor);

  return (
    <div
      onClick={(e) => themeHandler(e)}
      className="ease-in-out duration-300 only-mobile-hover py-6 px-4 sm:py-0 sm:px-0 rounded-lg cursor-pointer w-full"
    >
      <Switch
        checked={theme}
        // onChange={() => {}}
        className={`relative group inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
          theme ? (bgColor ?? 'bg-primary-accent-color') : 'bg-gray-200 '
        }`}
      >
        <BsSunFill className="absolute left-1 static-text-black-color" />
        <span
          className={`z-1 size-4 translate-x-1 rounded-full bg-white transition ${theme ? 'translate-x-1' : 'translate-x-6'} ${theme ? 'bg-gray-200' : 'bg-primary-accent-color'}`}
        />
        <WiMoonWaningCrescent2 className=" absolute right-0.5 static-text-white-color" />
      </Switch>
    </div>
  );
};
