import { LangSwitcher } from '../../../features/LangSwitcher';
import { ThemeSwitcher } from '../../../features/ThemeSwitcher';
import { Button } from '../../../shared/ui/atoms/Button';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { Text } from '../../../shared/ui/atoms/Text';
import { useTranslation } from 'react-i18next';

export const HeaderActions = () => {
  const { t } = useTranslation();
  return (
    <section className="hidden navigation-responsive gap-0.5 items-center ">
      <ThemeSwitcher />
      <LangSwitcher />
      <Button className="py-3 px-4  lg:py-5 lg:px-7 flex gap-3 items-center whitespace-nowrap ">
        <Icon name="user-icon" size={14} className="lg:w-5 lg:h-5 " />
        <Text
          Element="p"
          font="font-work-sans-semibold"
          size="responsive-size-sm"
          color="static-text-white-color"
        >
          {t('button.signIn')}
        </Text>
      </Button>
    </section>
  );
};
