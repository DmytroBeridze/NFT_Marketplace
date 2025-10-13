import { LangSwitcher } from '../../../features/LangSwitcher';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { Text } from '../../../shared/ui/atoms/Text';
import { useTranslation } from 'react-i18next';
import { useAuthAction, useLocalStorage } from '../../../shared/lib/hooks';
import ThemeSwitcher from '../../../features/ThemeSwitcher/ui/ThemeSwitcher';
import { Button } from '../../../shared/ui/atoms';

export const HeaderActions = () => {
  const { getLocal } = useLocalStorage();
  const { t } = useTranslation();
  const { loginLogoutHandler } = useAuthAction();
  const token = getLocal('token');
  // const token = localStorage.getItem('token');
  // const { openHandler } = useToggleOverlay();

  return (
    // <section className=" navigation-responsive gap-0.5 items-center ">
    <section className="hidden navigation-responsive gap-0.5 items-center">
      <ThemeSwitcher />
      <LangSwitcher className="py-2 px-2" />
      <Button
        onClick={loginLogoutHandler}
        // onClick={() => openHandler('authorization')}
        className="py-3 px-4  lg:py-5 lg:px-7 flex gap-3 items-center whitespace-nowrap "
        radius="xl"
      >
        {token ? (
          <Icon
            name={'user-icon'}
            size={14}
            className="lg:w-5 lg:h-5 text-white"
          />
        ) : (
          <Icon
            name={'door-icon'}
            size={16}
            className="lg:w-6 lg:h-6 text-white"
          />
        )}

        <Text
          Element="p"
          font="font-work-sans-semibold"
          size="responsive-size-sm"
          color="static-text-white-color"
        >
          {token ? t('button.signOut') : t('button.signIn')}
        </Text>
      </Button>
    </section>
  );
};
