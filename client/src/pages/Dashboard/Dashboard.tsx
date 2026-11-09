import { useAppSelector } from '../../app/store/reduxHooks';
import { InnerContainer } from '../../shared/ui/layout';

import { ProfileStatistics } from '../../widgets/ProfileStatistics';
import { useGetNftsQuery } from '../../entities/nft/model';
import { useGetFollowersByIdQuery } from '../../entities/subscribe/model';

import { ProfileTabs } from '../../widgets/ProfileTabs';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { PageHeader } from '../../shared/ui/organisms/PageHeader/PageHeader';

const Dashboard = () => {
  const { t } = useTranslation('dashboard');
  // -------------------user
  const user = useAppSelector((state) => state.user.data);
  const headerRef = useRef<HTMLParagraphElement>(null);
  // -------------------nft
  const {
    data,
    isError: isNftError,
    isLoading: isNftLoading,
  } = useGetNftsQuery({ authorId: user?._id }, { skip: !user });

  // ------------------followers

  const {
    isError: isFollowersError,
    isLoading: isFollowersLoading,
    isFetching: isFollowersFetching,
    data: followers,
  } = useGetFollowersByIdQuery(user?._id ?? '', { skip: !user });

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
    <section className="bg-primary-background-color relative ">
      {/* ----------------------------Header */}
      <PageHeader
        headerRef={headerRef}
        avatarSrc={user.avatar}
        coverImage={user.coverImage}
        showAvatar={true}
        title={t('titles.creativeSpace')}
      />

      <InnerContainer>
        {/* --------------------------Statistics */}
        {isFollowersError && (
          <div>
            <ProfileStatistics.error />
          </div>
        )}

        {!isFollowersError &&
          (!isFollowersLoading ? (
            <ProfileStatistics
              bio={user?.bio}
              name={user.userName}
              socialLinks={user?.socialLinks}
              nfts={data?.items}
              followers={followers?.followersCount}
            />
          ) : (
            <ProfileStatistics.skeleton />
          ))}
        {/* --------------------------Tabs */}
        <ProfileTabs />
      </InnerContainer>
    </section>
  );
};
export default Dashboard;
/*

pages/
└── Dashboard/

widgets/
├── ProfileHeader/
├── ProfileStatistics/
├── ProfileTabs/
├── AuthorGallery/
└── ClientCollection/

features/
├── edit-profile/
├── upload-avatar/
├── upload-banner/
└── follow-author/

entities/
├── user/
├── nft/
└── gallery/

shared/
└── ui/
    ├── Avatar/
    ├── Button/
    ├── Modal/
    └── Input/


*/
