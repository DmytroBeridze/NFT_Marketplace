import { InnerContainer } from '../../shared/ui/layout';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useAppSelector } from '../../app/store/reduxHooks';
import { PageHeader } from '../../shared/ui/organisms/PageHeader/PageHeader';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedPageHeading } from '../../shared/ui/organisms/AnimatedPageHeading/AnimatedPageHeading';

export const EditProfile = () => {
  const headerRef = useRef<HTMLParagraphElement>(null);
  const { t, i18n } = useTranslation('dashboard');

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
        <div className="mt-[90px]">
          <AnimatedPageHeading
            title={t('titles.editProfile')}
            description={t('desc.personalizeSpace')}
          />
        </div>
      </InnerContainer>
    </section>
  );
};
