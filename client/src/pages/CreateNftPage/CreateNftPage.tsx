import { CreateNftForm } from '../../features/CreateNft';
import { InnerContainer } from '../../shared/ui/layout';
import { ProfileHeader } from '../../widgets/ProfileHeader';
import { useAppSelector } from '../../app/store/reduxHooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { useInView } from '../../shared/lib/hooks';
gsap.registerPlugin(SplitText);

export const CreateNftPage = () => {
  const [titleDone, setTitleDone] = useState(false);
  const { isVisible, ref } = useInView();

  const { t } = useTranslation('dashboard');

  const user = useAppSelector((state) => state.user.data);

  const headerRef = useRef<HTMLParagraphElement>(null);

  // ---------------------------------GSAP
  useGSAP(
    () => {
      if (!headerRef.current) return;
      let split = SplitText.create(headerRef.current, { type: 'words, chars' });

      gsap.from(split.chars, {
        duration: 0.4,
        x: 500,
        autoAlpha: 0,
        stagger: 0.03,
      });
    },
    { scope: headerRef },
  );

  return (
    <section>
      {/* ----------------------------Header */}
      <div className="relative ">
        <ProfileHeader coverImage={user?.coverImage} />

        <InnerContainer className="absolute  left-1/2  top-1/2 -translate-x-1/2  -translate-y-1/2">
          <h1
            className="text-amber-300  font-space-mono-bold   text-4xl 
           t-text-3xl"
            ref={headerRef}
          >
            Bring Your Art to Life
          </h1>
        </InnerContainer>
      </div>

      <InnerContainer>
        {/* ----------------Type animation------------- */}

        <div className="flex flex-col" ref={ref}>
          {isVisible && (
            <TypeAnimation
              sequence={[
                800,
                t('titles.create'),
                (el) => {
                  el?.classList.add('typing-done');
                  setTitleDone(true);
                },
              ]}
              wrapper="h2"
              speed={60}
              style={{ fontSize: '2em', display: 'inline-block' }}
              repeat={0}
              className="typing-title font-work-sans-semibold responsive-size-lg text-primary-text-color mt-[90px]"
              cursor={false}
            />
          )}

          <div className="relative">
            <p
              aria-hidden="true"
              className="invisible font-work-sans-regular responsive-size-md  mb-[60px]"
            >
              {t('desc.MintDigitalItem')}
            </p>

            <div className="absolute left-0  top-0">
              {titleDone && (
                <TypeAnimation
                  sequence={[
                    0,

                    (el) => {
                      el?.classList.remove('typing-done');
                      el?.classList.add('typing-started');
                    },
                    t('desc.MintDigitalItem'),
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
        {/* ----------------------------- */}

        <CreateNftForm />
      </InnerContainer>
    </section>
  );
};
