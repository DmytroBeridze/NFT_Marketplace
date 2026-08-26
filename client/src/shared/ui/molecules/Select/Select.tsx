import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useRef, useState, type InputHTMLAttributes } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { Icon, responsiveRadius } from '../../atoms';
import { useField } from 'formik';
import type { IconName } from '../../../lib/icons';

type SelectData = { id: string | null; name: string } | null;

type SelectProps = {
  data: SelectData[];
  width?: string;
  hight?: string;
  border?: string;
  background?: string;
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  wrapperClassName?: string;
  icon?: IconName;
  iconSize?: number;
  iconColor?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Select = ({
  data,
  width = 'w-full',
  hight,
  border = 'border-secondary-color',
  background = 'bg-secondary-background-color',
  radius = 'sm',
  name,
  id,
  className,
  wrapperClassName,
  icon,
  iconSize,
  iconColor = '',
}: SelectProps) => {
  const [query, setQuery] = useState('');

  const [field, meta, helpers] = useField(name);

  console.log(field.value);

  // -----------------------------------------filtered Data
  const filteredData =
    query === ''
      ? data
      : data.filter((element: SelectData) => {
          return element?.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={`relative  ${width} ${hight} ${wrapperClassName}`}>
      <Combobox
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        onClose={() => {
          setQuery('');
        }}
      >
        <div className="relative">
          {/* ------------------icon */}
          {icon && (
            <div
              className={`absolute  top-1/2 -translate-y-1/2 px-2.5 ${iconColor}`}
            >
              <Icon name={icon} size={iconSize} />
            </div>
          )}

          <ComboboxInput
            autoComplete="off"
            id={id}
            name={name}
            displayValue={(selected: SelectData) => selected?.name ?? ''}
            onChange={(event) => setQuery(event.target.value)}
            className={`
             ${border}
             ${background}
             ${responsiveRadius[radius]}
            ${className}
            w-full 
            input-focus 
             text-sm/6 text-primary-text-color focus:not-data-focus:outline-none pr-8`}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <IoChevronDownCircleOutline className="size-4 fill-white/60 group-data-hover:fill-white" />
          </ComboboxButton>
        </div>
        {/* ------------------------------------options */}
        <ComboboxOptions
          anchor="bottom"
          transition
          className="w-(--input-width) rounded-xl border border-white/5 bg-[var(--button-inversive-background)] 
          p-1 [--anchor-gap:--spacing(1)] empty:invisible transition duration-100 ease-in data-leave:data-closed:opacity-0"
        >
          {filteredData.map((item: SelectData) => {
            return (
              <ComboboxOption
                key={item?.id ?? item?.name}
                value={item}
                className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-[var(--primary-background-color)]/10"
              >
                <div className="text-sm/6 text-inversive-text-color">
                  {item?.name}
                </div>
              </ComboboxOption>
            );
          })}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};
