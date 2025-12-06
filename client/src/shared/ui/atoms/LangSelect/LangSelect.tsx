import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { Text } from '../Text';
import { type Dispatch } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { PiGlobeLight } from 'react-icons/pi';

type Language = {
  id: string;
  name: string;
};

interface LangSelectProps {
  selectedLang: Language;
  setSelectedLang: Dispatch<Language>;
  languages: Language[];
  language: string;
  className?: string;
}

export const LangSelect = ({
  selectedLang,
  setSelectedLang,
  languages,
  language,
  className,
}: LangSelectProps) => {
  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
      {({ open }) => (
        <div className="relative w-full">
          <ListboxButton
            className={`${className} relative  focus-visible:outline-none focus-visible:ring-0 
             cursor-pointer ease-in-out duration-300 bg-burger-hover-background-color
              bg-burger-hover-background-color-desktop py-6 px-4    rounded-lg  w-full `}
            // className={`${className}  sm:rounded-lg md:rounded-2xl lg:rounded-3xl focus-visible:outline-none focus-visible:ring-0  cursor-pointer ease-in-out duration-300 bg-burger-hover-background-color py-6 px-4  rounded-lg  w-full`}
          >
            {/* <ListboxButton className="rounded-md sm:rounded-lg md:rounded-2xl lg:rounded-3xl   cursor-pointer py-2 px-5  bg-adaptive-button-background-color"> */}
            {
              <Text
                size="t-text-sm"
                font="font-work-sans-regular"
                color="text-primary-text-color"
                // color="text-inversive-text-color"
                className="flex items-center gap-0.5"
              >
                <PiGlobeLight />

                {/* {nameLang} */}
                {selectedLang.name}
                <IoIosArrowDown
                  className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </Text>
            }
          </ListboxButton>
          <ListboxOptions
            anchor="bottom start"
            className="lg:w-(--button-width) py-1 px-1 mt-1  bg-white  focus-visible:outline-none focus-visible:ring-0  cursor-pointer rounded-lg shadow-secondary z-[999]  "
          >
            {languages.map((lang) => (
              <ListboxOption
                key={lang.id}
                value={lang}
                className={
                  ' h-10 px-3   data-focus:bg-blue-100 flex gap-2 items-center outline-0 bg-white rounded-lg  '
                }
              >
                {lang.name}
                {language === lang.name.toLowerCase() ? (
                  <IoCheckmarkOutline />
                ) : null}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
};
