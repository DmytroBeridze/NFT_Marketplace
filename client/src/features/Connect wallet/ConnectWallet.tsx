import { useTranslation } from 'react-i18next';
import AuthorizationPlaceholder from '../../shared/assets/images/authorization_Placeholder.png';
import { AuthLayout } from '../../widgets/AuthLayout';
import Tabs from '../Authorization/Tabs/ui/Tabs';
const { t } = useTranslation('weeklyDigest');

export const ConnectWallet = () => {
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
