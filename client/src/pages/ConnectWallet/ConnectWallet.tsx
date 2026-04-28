import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../../widgets/AuthLayout';
import Tabs from '../../features/Authorization/Tabs/ui/Tabs';
import AuthorizationPlaceholder from '../../shared/assets/images/authorization_Placeholder.png';

const ConnectWallet = () => {
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

export default ConnectWallet;
