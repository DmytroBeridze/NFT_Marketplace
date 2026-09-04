import { Textarea } from '@headlessui/react';
import { afterRequiredStyle } from '../lib';
import type { ChangeEvent, FocusEvent } from 'react';

type KeywordsFieldProps = {
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any, Element>) => void;
  keywords: string;
};

export const KeywordsField = ({
  handleChange,
  handleBlur,
  keywords,
}: KeywordsFieldProps) => {
  return (
    <div className="col-span-2 ">
      <label
        htmlFor="NFTkeywords"
        className={`text-primary-text-color ${afterRequiredStyle}`}
      >
        Keywords
      </label>
      <Textarea
        onChange={handleChange}
        onBlur={handleBlur}
        value={keywords}
        name="keywords"
        id="NFTkeywords"
        placeholder="e.g. art, landscape, digital, abstract"
        className="w-full h-18 p-[10px]  input-focus  border-secondary-color 
              bg-secondary-background-color rounded-md text-primary-text-color"
        // rows={10}
      />
    </div>
  );
};
