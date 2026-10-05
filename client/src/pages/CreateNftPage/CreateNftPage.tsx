import { CreateNftForm } from '../../features/CreateNft';
import { InnerContainer } from '../../shared/ui/layout';
import { Text } from '../../shared/ui/atoms';
import { ProfileHeader } from '../../widgets/ProfileHeader';
import { useAppSelector } from '../../app/store/reduxHooks';
import { useTranslation } from 'react-i18next';

export const CreateNftPage = () => {
  const { t } = useTranslation('dashboard');
  // -------------------user
  const user = useAppSelector((state) => state.user.data);

  return (
    <section>
      {/* ----------------------------Header */}
      <ProfileHeader coverImage={user?.coverImage} />

      <InnerContainer>
        <Text
          Element="h2"
          font="font-work-sans-semibold"
          size="responsive-size-lg"
          color="text-primary-text-color"
          className="mt-[90px] "
        >
          {t('titles.create')}
        </Text>
        <Text
          Element="p"
          font="font-work-sans-regular"
          size="responsive-size-md"
          color="text-primary-text-color"
          className="mb-[60px] "
        >
          {t('desc.MintDigitalItem')}
        </Text>

        <CreateNftForm />
      </InnerContainer>
    </section>
  );
};
