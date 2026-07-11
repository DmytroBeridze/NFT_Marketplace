import { useEffect } from 'react';
import { useAppSelector } from '../../app/store/reduxHooks';
import { InnerContainer } from '../../shared/ui/layout';
import { ProfileHeader } from '../../widgets/ProfileHeader';
import { ProfileStatistics } from '../../widgets/ProfileStatistics';
import { useGetNftsQuery } from '../../entities/nft/model';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.data);
  const { data, isLoading, isError } = useGetNftsQuery(
    { authorId: user?._id },
    { skip: !user },
  );
  console.log('vvvvvvvvvvv---', data?.items);

  return (
    <section className="bg-primary-background-color ">
      <ProfileHeader coverImage={user?.coverImage} avatar={user?.avatar} />

      <InnerContainer>
        <ProfileStatistics />
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
