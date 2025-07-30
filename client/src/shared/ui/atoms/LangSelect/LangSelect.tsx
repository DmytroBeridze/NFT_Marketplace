import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { Text } from '../Text';
import type { Dispatch } from 'react';

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
}: LangSelectProps) => {
  return (
    <Listbox value={selectedLang} onChange={setSelectedLang}>
      {({ open }) => (
        <>
          <ListboxButton className=" w-auto  cursor-pointer py-1 px-2 rounded-lg bg-adaptive-button-background-color">
            {
              <Text
                size="t-text-sm"
                font="font-work-sans-regular"
                color="text-inversive-text-color"
                className="flex items-center gap-0.5"
              >
                {selectedLang.name}
                <IoIosArrowDown
                  className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </Text>
            }
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className=" w-(--button-width)  cursor-pointer rounded-lg shadow-secondary  py-1 px-2 "
          >
            {languages.map((lang) => (
              <ListboxOption
                key={lang.id}
                value={lang}
                className="data-focus:bg-blue-100 flex justify-center"
              >
                {lang.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </>
      )}
    </Listbox>
  );
};
