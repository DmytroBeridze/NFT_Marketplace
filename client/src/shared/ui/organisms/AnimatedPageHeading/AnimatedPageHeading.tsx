import { TypeAnimation } from 'react-type-animation';
import { useInView } from '../../../lib/hooks';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type AnimatedPageHeadingType = {
  title: string;
  description?: string;
};

export const AnimatedPageHeading = ({
  title,
  description,
}: AnimatedPageHeadingType) => {
  const { isVisible, ref } = useInView();
  const { t, i18n } = useTranslation('dashboard');
  const currentLanguage = i18n.resolvedLanguage;
  const [titleDone, setTitleDone] = useState(false);
  return (
    // {/* ----------------Type animation------------- */}

    <div className="flex flex-col" ref={ref}>
      <div className="relative">
        {/* -------------------------------Placeholder  for layout */}

        {!isVisible && (
          <h2
            aria-hidden="true"
            className=" typing-title font-work-sans-semibold 
            responsive-size-lg text-primary-text-color mt-[90px]"
            // className=" typing-title font-work-sans-semibold
            // responsive-size-lg text-primary-text-color mt-[90px]"
            style={{ fontSize: '2em', display: 'inline-block' }}
          >
            <span>|</span>
          </h2>
        )}

        {/* ----------------------------//---------------------------- */}
        {isVisible && (
          <div>
            <TypeAnimation
              key={currentLanguage}
              sequence={[
                800,
                title,
                // t('titles.create'),
                (el) => {
                  el?.classList.add('typing-done');
                  setTitleDone(true);
                },
              ]}
              wrapper="h2"
              speed={60}
              style={{ display: 'inline-block' }}
              // style={{ fontSize: '2em', display: 'inline-block' }}
              repeat={0}
              className="typing-title font-work-sans-semibold responsive-size-lg 
              text-primary-text-color "
              // className="typing-title font-work-sans-semibold responsive-size-lg
              // text-primary-text-color mt-[90px]"
              cursor={false}
            />
          </div>
        )}
      </div>
      {description && (
        <div className="relative">
          {/* -------------------------------Placeholder  for layout  */}
          <p
            aria-hidden="true"
            className="invisible font-work-sans-regular responsive-size-md  mb-[60px]"
          >
            {description}
            {/* {t('desc.MintDigitalItem')} */}
          </p>
          {/* ----------------------------//---------------------------- */}
          <div className="absolute left-0  top-0">
            {titleDone && (
              <TypeAnimation
                key={currentLanguage}
                sequence={[
                  0,

                  (el) => {
                    el?.classList.remove('typing-done');
                    el?.classList.add('typing-started');
                  },
                  description,
                  // t('desc.MintDigitalItem'),
                  (el) => {
                    el?.classList.remove('typing-started');
                    el?.classList.add('typing-done');
                  },
                ]}
                wrapper="p"
                speed={70}
                style={{ display: 'inline-block' }}
                repeat={0}
                className="typing-text font-work-sans-regular responsive-size-md text-primary-text-color mb-[60px]"
                cursor={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
