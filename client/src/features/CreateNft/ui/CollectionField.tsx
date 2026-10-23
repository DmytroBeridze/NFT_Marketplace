import { useTranslation } from 'react-i18next';
import { Select } from '../../../shared/ui/molecules/Select';
import type { CategoryFieldProps } from '../model';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

export const CollectionField = ({ categories }: CategoryFieldProps) => {
  const { t } = useTranslation('dashboard');

  const normalizeCategories = categories.map((category) => ({
    id: category._id,
    name: t(`categories.${category.name}`),
  }));

  // ----------------------GSAP
  const collectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!collectionRef.current) return;

      gsap.from(collectionRef.current, {
        scrollTrigger: {
          trigger: collectionRef.current,
        },
        autoAlpha: 0,
        duration: 0.5,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });
    },
    { scope: collectionRef },
  );

  return (
    <div
      ref={collectionRef}
      className="flex flex-col w-full max-[1200px]:col-span-3 max-[900px]:col-span-1"
    >
      <label htmlFor="NFTcategory" className={`text-primary-text-color `}>
        {t('titles.collection')}
      </label>
      <Select
        data={normalizeCategories}
        className="text-primary-text-color pr-8 py-[10px] pl-10 "
        name="collection"
        id="NFTcollection"
        icon="galleryPhoto-icon"
        iconColor="text-primary-text-color"
        iconSize={20}
      />
    </div>
  );
};
