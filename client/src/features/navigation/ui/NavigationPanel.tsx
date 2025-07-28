import { useTranslation } from 'react-i18next';
import { Text } from '../../../shared/ui/atoms/Text';
import { Button } from '../../../shared/ui/atoms/Button';
import { useLanguage } from '../../../shared/lib/i18n';
import { Icon } from '../../../shared/ui/atoms/Icon';

export const NavigationPanel = () => {
  const { changeLang, lang } = useLanguage();

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex gap-3">
        <Icon name="logo-icon" size={32} />
        <Text Element="div" font="font-space-mono-bold" size="t-text-ms">
          {'NFT Marketplace'}
        </Text>
      </div>
    </div>
  );
};
