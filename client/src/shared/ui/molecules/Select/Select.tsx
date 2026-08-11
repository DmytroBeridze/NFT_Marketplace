import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

const people: any = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];

export const Select = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(people[1]);

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person: any) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="relative  w-full ">
      {/* <div className="mx-auto h-screen w-full "> */}
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery('')}
      >
        <div className="relative">
          <ComboboxInput
            className="w-full 
            border-secondary-color 
            bg-secondary-background-color rounded-md text-primary-text-color
            input-focus 
            py-1.5 pr-8 pl-3 text-sm/6 text-primary-text-color focus:not-data-focus:outline-none"
            // className="w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <IoChevronDownCircleOutline className="size-4 fill-white/60 group-data-hover:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className="w-(--input-width) rounded-xl border border-white/5 bg-[var(--button-inversive-background)] 
          p-1 [--anchor-gap:--spacing(1)] empty:invisible transition duration-100 ease-in data-leave:data-closed:opacity-0"
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-[var(--primary-background-color)]/10"
            >
              {/* <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" /> */}
              <div className="text-sm/6 text-inversive-text-color">
                {person.name}
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};
