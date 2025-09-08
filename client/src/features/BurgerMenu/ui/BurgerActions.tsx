import { LangSwitcher } from '../../../features/LangSwitcher';
import { Button } from '../../../shared/ui/atoms/Button';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { Text } from '../../../shared/ui/atoms/Text';
import { useTranslation } from 'react-i18next';
import { useToggleOverlay } from '../../../shared/ui/molecules/Overlay';
import { useAuthAction, useLocalStorage } from '../../../shared/lib/hooks';
import ThemeSwitcher from '../../ThemeSwitcher/ui/ThemeSwitcher';

export const BurgerActions = () => {
  const { t } = useTranslation();
  const { openHandler } = useToggleOverlay();
  const { loginLogoutHandler, user } = useAuthAction();
  const { getLocal } = useLocalStorage();
  const token = getLocal('token');
  // const token = localStorage.getItem('token');

  return (
    <section
      className="flex flex-col navigation-responsive 
         max-w-full relative  before:content-[''] before:absolute 
         before:-top-6 before:left-0 before:w-full before:h-0.5 
          before:bg-white/20"
    >
      <div
        // onClick={() => openHandler('authorization')}
        className="ease-in-out duration-300 
      flex flex-col sm:flex-row  sm:items-center gap-2.5 justify-between py-4 px-4 bg-burger-hover-background-color 
      rounded-lg cursor-pointer w-full"
      >
        <Button
          variant="secondary"
          className="py-3 px-6  lg:py-5 lg:px-7 flex gap-3 items-center whitespace-nowrap  "
          onClick={loginLogoutHandler}
        >
          {token ? (
            <Icon name={'user-icon'} size={14} className="lg:w-5 lg:h-5 " />
          ) : (
            <Icon name={'door-icon'} size={16} className="lg:w-6 lg:h-6" />
          )}

          <Text
            Element="p"
            font="font-work-sans-semibold"
            size="responsive-size-sm"
            color="text-inversive-text-color"
          >
            {token ? t('button.signOut') : t('button.signIn')}
          </Text>
        </Button>
        <div className="hidden sm:block">
          <ThemeSwitcher bgColor="bg-static-primary-background-color" />
        </div>
      </div>

      {/* <div className="ease-in-out duration-300 sm:hidden  flex items-center py-6 px-4 bg-burger-hover-background-color rounded-lg cursor-pointer w-full"> */}
      <div className="sm:hidden  flex items-center ">
        <ThemeSwitcher bgColor="bg-static-primary-background-color" />
      </div>
      <div>
        {/* <div className="ease-in-out duration-300 flex items-center py-6 px-4 bg-burger-hover-background-color rounded-lg cursor-pointer w-full"> */}
        <LangSwitcher className="w-18" />
      </div>
    </section>
  );
};
