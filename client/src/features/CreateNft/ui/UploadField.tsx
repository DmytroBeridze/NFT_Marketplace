import { useTranslation } from 'react-i18next';
import { Text } from '../../../shared/ui/atoms';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

type UploadFieldProps = {
  isSubmitting: boolean;
};

export const UploadField = ({ isSubmitting }: UploadFieldProps) => {
  const { t } = useTranslation('dashboard');

  // ----------------------GSAP
  const uploadRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!uploadRef.current) return;

      gsap.from(uploadRef.current, {
        scrollTrigger: {
          trigger: uploadRef.current,
        },
        autoAlpha: 0,
        duration: 0.5,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });
    },
    { scope: uploadRef },
  );

  return (
    <div ref={uploadRef} className="col-span-2 max-[900px]:col-span-1">
      <ButtonWithIcon
        type="submit"
        className={`px-12 py-5 w-full flex items-center justify-center static-text-white-color
           max-[1200px]:col-span-2 max-[1200px]:!rounded-xl
           ${isSubmitting ? 'opacity-40' : 'opacity-100'}`}
        iconName="upload-cloud"
        disabled={isSubmitting}
      >
        <Text
          Element="span"
          color="static-text-white-color"
          font="font-work-sans-regular"
        >
          {t('buttons.uploadNFT')}
        </Text>
      </ButtonWithIcon>
    </div>
  );
};
