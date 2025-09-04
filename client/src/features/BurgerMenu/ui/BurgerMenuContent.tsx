import { Icon } from '../../../shared/ui/atoms/Icon';
import { Text } from '../../../shared/ui/atoms/Text';

import { NavigationPanel, type NavItemTuple } from '../../navigation';
import { useCloseBurgerMenu } from '../lib/useCloseBurgerMenu';

import { BurgerActions } from './BurgerActions';
import {
  HeaderLogo,
  LogoVariantContext,
} from '../../../shared/ui/molecules/HeaderLogo';
import { useTranslate } from '../../../shared/lib/i18n';
import type { NavItems } from '../../../shared/types';

export const BurgerMenuContent = () => {
  const { closeBurger } = useCloseBurgerMenu();
  const { lang, translateVariables } = useTranslate<NavItems>({
    translateKey: 'nav',
    returnObjects: true,
  });

  const navItems = Object.entries(translateVariables) as NavItemTuple[];

  return (
    <>
      {/* смена цвета иконки лого в бургере */}
      <LogoVariantContext.Provider value="burger">
        <HeaderLogo className="px-4" />

        <Icon
          name="close-icon"
          style={{ color: 'white' }}
          className="absolute right-10 top-11 cursor-pointer"
          onClick={closeBurger}
        />
        <NavigationPanel
          classNameList="flex flex-col  justify-center gap-nav-responsive  navigation-responsive"
          classNameItem="ease-in-out duration-300 flex items-center
         py-6 px-4 bg-burger-hover-background-color
          rounded-lg   cursor-pointer"
          lang={lang}
          navItems={navItems}
          renderItem={(value, lang, isActive) => (
            <Text
              size="responsive-size-md"
              font="font-work-sans-semibold"
              color={isActive ? 'text-primary-text-color' : 'text-burger-color'}
              Element="span"
              className={`leading-normal ${lang === 'ua' ? 'lang-ua' : ''}  `}
            >
              {value}
            </Text>
          )}
        />
      </LogoVariantContext.Provider>

      <BurgerActions />
    </>
  );
};
