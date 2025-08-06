import { LangSwitcher } from '../../../features/LangSwitcher';
import { ThemeSwitcher } from '../../../features/ThemeSwitcher';
import { Button } from '../../../shared/ui/atoms/Button';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { Text } from '../../../shared/ui/atoms/Text';
import { useTranslation } from 'react-i18next';

export const BurgerActions = () => {
  const { t } = useTranslation();

  return (
    <section className={'flex flex-col navigation-responsive gap-8 max-w-30'}>
      <Button
        variant="secondary"
        className="py-3 px-4  lg:py-5 lg:px-7 flex gap-3 items-center whitespace-nowrap "
      >
        <Icon name="user-icon" size={14} className="lg:w-5 lg:h-5" />
        <Text
          Element="p"
          font="font-work-sans-semibold"
          size="responsive-size-sm"
          color="text-inversive-text-color"
        >
          {t('button.signIn')}
        </Text>
      </Button>
      <div className="flex flex-col gap-2.5">
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </section>
  );
};
