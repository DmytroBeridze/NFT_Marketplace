import { Link, useNavigate } from 'react-router-dom';
import type { INft } from '../../entities/nft/model';
import type { SocialLinks } from '../../entities/user/model';
import { ErrorText, Icon, Text } from '../../shared/ui/atoms';
import { ButtonWithIcon } from '../../shared/ui/molecules/ButtonWithIcon';
import { linksMap } from './socialIconMap';
import { useTranslation } from 'react-i18next';
import { useTranslate } from '../../shared/lib/i18n';
import { useInView } from '../../shared/lib/hooks';
import { TypeAnimation } from 'react-type-animation';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type ProfileStatisticsProps = {
  bio?: string;
  nfts?: INft[];
  followers?: number;
  name: string;
  socialLinks?: SocialLinks;
};
type Statistics = {
  works: string;
  NFTsSold: string;
  followers: string;
};

export const ProfileStatistics = ({
  bio,
  nfts,
  name,
  followers,
  socialLinks,
}: ProfileStatisticsProps) => {
  const nftSold = nfts?.filter((elem) => elem.sold);

  const { t, i18n } = useTranslation('dashboard');
  const currentLanguage = i18n.resolvedLanguage;

  const { translateVariables } = useTranslate<Statistics>({
    translateKey: 'statistics',
    document: 'dashboard',
    returnObjects: true,
  });

  let navigate = useNavigate();
  const { isVisible, ref } = useInView();
  // -----------------------statistics
  const statistics = [
    { itemName: translateVariables.works, value: nfts?.length },
    { itemName: translateVariables.NFTsSold, value: nftSold?.length },
    { itemName: translateVariables.followers, value: followers },
  ];

  // -------------------------socialLinks
  const linksCollection = socialLinks
    ? Object.entries(socialLinks).filter(
        ([key, value]) => key !== '_id' && Boolean(value),
      )
    : [];

  // !-----------------------Винести в хук
  // ----------------------GSAP
  const statisticsRef = useRef<HTMLUListElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const createBtnRef = useRef<HTMLDivElement>(null);
  const editBtnRef = useRef<HTMLDivElement>(null);
  const galleryBtnRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !statisticsRef.current ||
        !bioRef ||
        !linksRef ||
        !createBtnRef ||
        !editBtnRef ||
        !galleryBtnRef
      )
        return;
      // -------------------statistics
      gsap.from(statisticsRef.current, {
        scrollTrigger: {
          trigger: statisticsRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.5,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });

      // -------------------bio
      gsap.from(bioRef.current, {
        scrollTrigger: {
          trigger: bioRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.9,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });

      // -------------------links
      gsap.from(linksRef.current, {
        scrollTrigger: {
          trigger: linksRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.9,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });

      // -------------------create
      gsap.from(createBtnRef.current, {
        scrollTrigger: {
          trigger: createBtnRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.5,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });

      // -------------------edit Btn
      gsap.from(editBtnRef.current, {
        scrollTrigger: {
          trigger: editBtnRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 0.9,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });

      // -------------------gallery Btn
      gsap.from(galleryBtnRef.current, {
        scrollTrigger: {
          trigger: galleryBtnRef.current,
          // start: 'top 60%',
        },
        autoAlpha: 0,
        duration: 1.2,
        opacity: 0,
        stagger: 0.15,
        y: 100,
        ease: 'power2.out',
      });
    },
    { scope: statisticsRef },
  );
  // !-----------------//-----
  return (
    <section
      className="flex justify-between mt-[90px] text-primary-text-color mb-10
    max-[1300px]:flex-col gap-7
    "
    >
      {/* ------responsive-hidden block------ */}

      <Text
        className="hidden  max-[1300px]:block"
        Element="h2"
        font="font-work-sans-semibold"
        size="responsive-size-lg"
      >
        {name}
      </Text>

      {/* ------------------------- */}

      <div
        className="basis-[50%] grow shrink flex flex-col gap-8 max-w-[800px] 
      max-[1300px]:order-2
      "
      >
        {/* -------------------------------Type animation */}
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

          <div ref={ref}>
            {isVisible && (
              <div>
                <TypeAnimation
                  key={currentLanguage}
                  sequence={[
                    800,
                    name,
                    (el) => {
                      el?.classList.add('typing-done');
                      // setTitleDone(true);
                    },
                  ]}
                  wrapper="h2"
                  speed={60}
                  style={{ display: 'inline-block' }}
                  // style={{ fontSize: '2em', display: 'inline-block' }}
                  repeat={0}
                  className="typing-title font-work-sans-semibold responsive-size-lg text-primary-text-color "
                  cursor={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------- */}

        {/* -------statistics */}
        <ul
          className="grid grid-cols-3 gap-4 max-w-[600px]"
          ref={statisticsRef}
        >
          {statistics.map((elem) => (
            <li key={elem.itemName}>
              <Text font="font-space-mono-bold" size="responsive-size-mdl">
                {elem.value}
              </Text>
              <Text
                font="font-work-sans-regular"
                size="responsive-size-md"
                className="hyphens-auto break-words"
              >
                {elem.itemName}
              </Text>
            </li>
          ))}
        </ul>
        {/* -------bio */}
        <div ref={bioRef}>
          <Text
            font="font-space-mono-bold"
            size="t-text-md"
            color="text-secondary-text-color"
          >
            {t('titles.bio')}
          </Text>
          <Text font="font-work-sans-regular" size="responsive-size-md">
            {bio}
          </Text>
        </div>

        {/* -------links */}
        <div ref={linksRef}>
          <Text
            font="font-space-mono-bold"
            size="t-text-md"
            color="text-secondary-text-color"
          >
            {t('titles.links')}
          </Text>

          <ul className="flex gap-3.5  mt-4  static-text-purple-color ">
            {linksCollection.map((elem) => {
              const lnc = linksMap[elem[0]];

              return (
                <li
                  key={elem[0]}
                  className="hover:opacity-70 duration-300 ease-in-out"
                >
                  <Link to={elem[1]}>
                    <Icon name={lnc} size={32} fill="currentColor" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ---------------------------------Buttons */}
      <div className="basis-[50%]  self-start max-[834px]:self-auto flex justify-end  max-[834px]:justify-normal  max-[1300px]:order-1">
        <div className="grid  grid-cols-2 gap-4 w-full max-w-[400px] justify-end   max-[834px]:grid-cols-1">
          <div
            ref={createBtnRef}
            className="col-start-1 col-end-3  max-[834px]:col-end-1"
          >
            <ButtonWithIcon
              radius="xl"
              iconName="imgPlus-icon"
              className="py-5 px-12 items-center w-full"
              // className="py-5 px-12 items-center  col-start-1 col-end-3  max-[834px]:col-end-1 "
              fill="none"
              iconClassName="static-text-white-color "
              onClick={() => navigate('createNftPage')}
              // onClick={() => navigate('/dashboard/createNftPage')}
            >
              {t('buttons.createNFT')}
            </ButtonWithIcon>
          </div>
          <div ref={editBtnRef}>
            <ButtonWithIcon
              radius="xl"
              variant="outline"
              iconName="edit-icon"
              className="py-[18px]  max-[834px]:py-[20px] px-10 items-center w-full"
              // className="py-[18px]  max-[834px]:py-[20px] px-10 items-center"
              textClassName="text-primary-text-color leading-[normal]"
              iconClassName="text-primary-text-color"
              onClick={() => navigate('editProfile', { state: 'test state' })}
            >
              {t('buttons.editProfile')}
            </ButtonWithIcon>
          </div>

          <div ref={galleryBtnRef}>
            <ButtonWithIcon
              radius="xl"
              variant="secondary"
              iconName="gallery-icon"
              className="py-[18px] max-[834px]:py-[20px] px-10 items-center w-full"
              textClassName="text-inversive-text-color text-base leading-[normal] "
            >
              {t('buttons.createGallery')}
            </ButtonWithIcon>
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------------Skeleton

ProfileStatistics.skeleton = () => {
  return (
    <section
      className="flex justify-between mt-[90px] text-primary-text-color mb-10
    max-[1300px]:flex-col gap-7  animate-pulse
    "
    >
      {/* ------responsive-hidden block------ */}

      <div
        className="hidden  max-[1300px]:block skeleton-adaptive-background
       w-[200px] h-[40px] "
      ></div>

      <div
        className="basis-[50%] grow shrink flex flex-col gap-8 max-w-[800px] 
      max-[1300px]:order-2 
      "
      >
        {/* --------name */}
        <div
          className="max-[1300px]:hidden 
        skeleton-adaptive-background w-[200px] h-[40px] "
        ></div>
        {/* -------statistics */}
        <ul className="grid grid-cols-3 gap-4 max-w-[500px]">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <li key={i}>
                <div className=" w-full  h-[74px] skeleton-adaptive-background"></div>
              </li>
            ))}
        </ul>
        {/* -------bio */}
        <div>
          <div className=" w-full max-w-[500px] h-[150px] skeleton-adaptive-background"></div>
        </div>

        {/* -------links */}
        <div>
          <ul className="flex gap-3.5    static-text-purple-color ">
            {Array(4)
              .fill(0)
              .map((_, i) => {
                return (
                  <li
                    key={i}
                    className="w-[30px] h-[30px] skeleton-adaptive-background"
                  ></li>
                );
              })}
          </ul>
        </div>
      </div>
      <div
        className="basis-[50%]   self-start max-[834px]:self-auto flex justify-end    max-[1300px]:order-1
      max-[1300px]:w-full max-[1300px]:justify-normal
      "
      >
        <div className="grid  grid-cols-2 gap-4 w-full max-w-[400px] justify-end   max-[834px]:grid-cols-1">
          {/* b1 */}
          <div
            className="skeleton-adaptive-background col-start-1 col-end-3 items-center
            max-[834px]:col-end-1 h-[64px]"
          ></div>

          {/* b2 */}

          <div className="skeleton-adaptive-background  h-[64px] w-full"></div>
          {/* b3 */}
          <div className="skeleton-adaptive-background h-[64px] w-full"></div>
        </div>
      </div>
    </section>
  );
};
// --------------------------Error

ProfileStatistics.error = () => {
  return (
    <section
      className="flex justify-center mt-[90px]  mb-10
     min-h-[10vh]
    min-[834px]:min-h-[20vh]
    min-[1300px]:min-h-[30vh]
    "
    >
      <ErrorText
        Element="div"
        className="text-red-700 w-full  text-center 
            responsive-size-sm animate-pulse my-20 "
      >
        Loading Error...
      </ErrorText>
    </section>
  );
};
