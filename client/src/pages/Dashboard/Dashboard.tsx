import { useAppSelector } from '../../app/store/reduxHooks';
import { InnerContainer } from '../../shared/ui/layout';
import { ProfileHeader } from '../../widgets/ProfileHeader';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.data);

  return (
    <section className="bg-primary-background-color ">
      <ProfileHeader coverImage={user?.coverImage} avatar={user?.avatar} />

      {/* <InnerContainer></InnerContainer> */}
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
