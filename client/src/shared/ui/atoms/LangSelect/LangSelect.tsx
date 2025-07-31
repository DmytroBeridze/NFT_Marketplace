import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { Text } from '../Text';
import type { Dispatch } from 'react';
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
}

export const LangSelect = ({
  selectedLang,
  setSelectedLang,
  languages,
  language,
}: LangSelectProps) => {
  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
      {({ open }) => (
        <div>
          <ListboxButton className="rounded-md sm:rounded-lg md:rounded-2xl lg:rounded-3xl focus-visible:outline-none focus-visible:ring-0  cursor-pointer py-2 px-2 ">
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
                {selectedLang.name}
                <IoIosArrowDown
                  className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </Text>
            }
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className=" w-(--button-width) py-1 px-1 mt-1  bg-white  focus-visible:outline-none focus-visible:ring-0  cursor-pointer rounded-lg shadow-secondary   "
          >
            {languages.map((lang) => (
              <ListboxOption
                key={lang.id}
                value={lang}
                className={
                  ' h-10 px-3 data-focus:bg-blue-100 flex gap-2 items-center outline-0 bg-white rounded-lg  '
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
