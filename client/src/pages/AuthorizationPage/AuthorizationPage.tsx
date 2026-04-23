import { Image } from '../../shared/ui/atoms';
import AuthorizationPlaceholder from '../../shared/assets/images/authorization_Placeholder.png';

import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../shared/ui/molecules/SectionHeader';

import Tabs from '../../widgets/Tabs/ui/Tabs';

const AuthorizationPage = () => {
  const { t } = useTranslation('weeklyDigest');
  // const { setTab, tab } = useAuthorizationContext();
  return (
    <section
      className="flex h-[800px] gap-12 bg-primary-background-color 
     max-[834px]:flex-col  max-[834px]:h-auto max-[834px]:items-center "
    >
      <Image
        alt="authorizationPlaceholder"
        src={AuthorizationPlaceholder}
        className="flex-1 basis-[50%] min-w-0"
        height="100%"
      />
      <div className=" flex-1 basis-[50%]  flex flex-col justify-center">
        {/* <AuthorizationModal /> */}

        <SectionHeader
          responsive={false}
          title={t('title')}
          description={t('description')}
          className="mb-10"
        />
        <Tabs />
      </div>
    </section>
  );
};

export default AuthorizationPage;
