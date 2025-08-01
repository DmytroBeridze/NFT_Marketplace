import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../../../features/LangSwitcher';
import { NavigationPanel } from '../../../features/navigation';
import { Button } from '../../../shared/ui/atoms/Button';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { Text } from '../../../shared/ui/atoms/Text';
import { HeaderLogo } from './HeaderLogo';
import { ThemeSwitcher } from '../../../features/ThemeSwitcher';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header
      className="
     max-w-full
     bg-primary-background-color
     text-primary-text-color
     py-5
     px-2.5
     "
    >
      <section className="my-0 mx-auto flex items-center justify-between max-w-[1180px] ">
        <nav className="flex items-center justify-between basis-[92%] mr-7">
          <HeaderLogo />
          <NavigationPanel />
        </nav>
        <section className="flex gap-0.5 items-center ">
          <ThemeSwitcher />
          <LangSwitcher />
          <Button className="py-5 px-7 flex gap-3 items-center whitespace-nowrap">
            <Icon name="user-icon" size={20} />
            <Text
              Element="p"
              font="font-work-sans-semibold"
              size="t-text-sm"
              color="static-text-white-color"
            >
              {t('button.signIn')}
            </Text>
          </Button>
        </section>
      </section>
    </header>
  );
};
