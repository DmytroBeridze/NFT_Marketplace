import { InnerContainer } from '../../shared/ui/layout';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useAppSelector } from '../../app/store/reduxHooks';
import { PageHeader } from '../../shared/ui/organisms/PageHeader/PageHeader';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../../shared/lib/hooks';
import { TypeAnimation } from 'react-type-animation';

export const EditProfile = () => {
  const headerRef = useRef<HTMLParagraphElement>(null);
  const { t, i18n } = useTranslation('dashboard');
  const currentLanguage = i18n.resolvedLanguage;
  const { isVisible, ref } = useInView();
  const [titleDone, setTitleDone] = useState(false);
  // -------------------user
  const user = useAppSelector((state) => state.user.data);
  if (!user) return null;

  // ---------------------------------GSAP
  useGSAP(
    () => {
      if (!headerRef.current) return;
      let split = SplitText.create(headerRef.current, { type: 'words, chars' });

      gsap.from(split.chars, {
        duration: 0.4,
        x: 100,
        autoAlpha: 0,
        stagger: 0.03,
      });
    },
    { scope: headerRef },
  );

  return (
    <section className="bg-primary-background-color">
      {/* ----------------------------Header */}

      <PageHeader
        headerRef={headerRef}
        coverImage={user.coverImage}
        title={t('titles.editProfile')}
      />
      <InnerContainer>
        {/* ----------------Type animation------------- */}

        <div className="flex flex-col" ref={ref}>
          <div className="relative">
            {/* -------------------------------Placeholder  for layout */}

            {!isVisible && (
              <h2
                aria-hidden="true"
                className=" typing-title font-work-sans-semibold responsive-size-lg text-primary-text-color mt-[90px]"
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
                    t('titles.editProfile'),
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
                  className="typing-title font-work-sans-semibold responsive-size-lg text-primary-text-color mt-[90px]"
                  cursor={false}
                />
              </div>
            )}
          </div>

          <div className="relative">
            {/* -------------------------------Placeholder  for layout  */}
            <p
              aria-hidden="true"
              className="invisible font-work-sans-regular responsive-size-md  mb-[60px]"
            >
              {t('desc.personalizeSpace')}
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
                    t('desc.personalizeSpace'),
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
        </div>
      </InnerContainer>
    </section>
  );
};
