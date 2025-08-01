import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { WiMoonWaningCrescent2 } from 'react-icons/wi';

interface ThemeSelectProps {
  toggleTheme: () => void;
}

export const ThemeSelect = ({ toggleTheme }: ThemeSelectProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    toggleTheme();
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`relative group inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
        enabled ? 'bg-gray-200' : 'bg-primary-accent-color'
      }`}
      //   className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition group-data-[checked]:translate-x-6"
      //   data-checked={enabled ? true : undefined}
    >
      <BsSunFill className="absolute left-1 static-text-black-color" />
      <span
        className={`z-20 size-4 translate-x-1 rounded-full bg-white transition ${enabled ? 'translate-x-6' : 'translate-x-1'} ${enabled ? 'bg-primary-accent-color' : 'bg-gray-200'}`}
        // className={`bg-switch size-4 translate-x-1 rounded-full bg-white transition ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
      />
      <WiMoonWaningCrescent2 className=" absolute right-0.5 static-text-white-color" />
    </Switch>
  );
};
