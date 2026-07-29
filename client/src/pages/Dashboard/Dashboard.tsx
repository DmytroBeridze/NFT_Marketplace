import { useAppSelector } from '../../app/store/reduxHooks';
import { InnerContainer } from '../../shared/ui/layout';
import { ProfileHeader } from '../../widgets/ProfileHeader';
import { ProfileStatistics } from '../../widgets/ProfileStatistics';
import { useGetNftsQuery } from '../../entities/nft/model';
import {
  useFollowAuthorMutation,
  useGetFollowersByIdQuery,
} from '../../entities/subscribe/model';

const Dashboard = () => {
  // -------------------user
  const user = useAppSelector((state) => state.user.data);

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
    data: followers,
  } = useGetFollowersByIdQuery(user?._id ?? '', { skip: !user });

  if (!user) return null;

  // console.log('user---------', user);

  const {} = useFollowAuthorMutation();

  return (
    <section className="bg-primary-background-color">
      <ProfileHeader coverImage={user?.coverImage} avatar={user?.avatar} />

      <InnerContainer>
        <ProfileStatistics
          bio={user?.bio}
          name={user.userName}
          socialLinks={user?.socialLinks}
          nfts={data?.items}
          followers={followers?.followersCount}
        />
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
