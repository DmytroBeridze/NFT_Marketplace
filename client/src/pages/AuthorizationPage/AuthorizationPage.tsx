import AuthorizationPlaceholder from '../../shared/assets/images/authorization_Placeholder.png';
import { useTranslation } from 'react-i18next';
import Tabs from '../../features/Authorization/Tabs/ui/Tabs';
import { AuthLayout } from '../../widgets/AuthLayout/AuthLayout';

const AuthorizationPage = () => {
  const { t } = useTranslation('weeklyDigest');

  return (
    <AuthLayout
      description={t('description')}
      image={AuthorizationPlaceholder}
      alt="authorizationPlaceholder"
      title={t('title')}
    >
      <Tabs />
    </AuthLayout>
  );
};

export default AuthorizationPage;
