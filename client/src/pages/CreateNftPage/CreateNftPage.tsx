import { CreateNftForm } from '../../features/CreateNft';
import { InnerContainer } from '../../shared/ui/layout';

import { useAppSelector } from '../../app/store/reduxHooks';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { PageHeader } from '../../shared/ui/organisms/PageHeader/PageHeader';
import { AnimatedPageHeading } from '../../shared/ui/organisms/AnimatedPageHeading/AnimatedPageHeading';
gsap.registerPlugin(SplitText);

export const CreateNftPage = () => {
  const { t, i18n } = useTranslation('dashboard');

  const user = useAppSelector((state) => state.user.data);
  if (!user) return null;

  const headerRef = useRef<HTMLParagraphElement>(null);

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
    <section>
      {/* ----------------------------Header */}
      <PageHeader
        headerRef={headerRef}
        coverImage={user.coverImage}
        title={t('titles.bringYourArt')}
      />

      <InnerContainer>
        {/* ----------------Type animation title */}
        <div className="mt-[90px]">
          <AnimatedPageHeading
            title={t('titles.create')}
            description={t('desc.MintDigitalItem')}
          />
        </div>

        <CreateNftForm />
      </InnerContainer>
    </section>
  );
};
