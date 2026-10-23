import { Textarea } from '@headlessui/react';
import { afterRequiredStyle } from '../lib';
import { useRef, type ChangeEvent, type FocusEvent } from 'react';
import { useField } from 'formik';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const { t: tt } = useTranslation('dashboard');

  const [field, meta] = useField('keywords');

  // ----------------------GSAP
  const keywordsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!keywordsRef.current) return;

      gsap.from(keywordsRef.current, {
        scrollTrigger: {
          trigger: keywordsRef.current,
        },
        autoAlpha: 0,
        duration: 0.5,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });
    },
    { scope: keywordsRef },
  );

  return (
    <div
      ref={keywordsRef}
      className={`col-span-2 max-[1200px]:col-start-1 max-[1200px]:col-end-7   max-[900px]:col-span-1
    flex flex-col `}
    >
      <label
        htmlFor="NFTkeywords"
        className={`text-primary-text-color ${afterRequiredStyle}`}
      >
        {tt('titles.keywords')}
      </label>
      <Textarea
        onChange={handleChange}
        onBlur={handleBlur}
        value={keywords}
        name="keywords"
        id="NFTkeywords"
        placeholder="e.g. art, landscape, digital, abstract"
        className={`w-full h-18 p-[10px]  input-focus  border-secondary-color 
              bg-secondary-background-color rounded-md text-primary-text-color ${meta.error && meta.touched ? '!border-red-500 !border' : ''}`}
        // rows={10}
      />

      {meta.error && meta.touched ? (
        <div className="text-red-500 ">{t(`modal.errors.${meta.error}`)}</div>
      ) : null}
    </div>
  );
};
