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
      </LogoVariantContext.Provider>
      <Icon
        name="close-icon"
        style={{ color: 'white' }}
        className="absolute right-10 top-11 cursor-pointer"
        onClick={closeBurger}
      />
      <NavigationPanel
        classNameList="flex flex-col  justify-center gap-nav-responsive  navigation-responsive"
        classNameItem="ease-in-out duration-300 flex items-center py-6 px-4 bg-burger-hover-background-color rounded-lg cursor-pointer"
        // classNameItem="relative after:absolute after:left-0  after:bottom-[-2px] after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease  hover:after:scale-x-100 link-underline-burger"
        lang={lang}
        navItems={navItems}
        renderItem={(value, lang) => (
          <Text
            size="responsive-size-md"
            font="font-work-sans-semibold"
            color="text-burger-color"
            Element="span"
            className={`leading-normal ${lang === 'ua' ? 'lang-ua' : ''}  `}
          >
            {value}
          </Text>
        )}
      />

      <BurgerActions />
    </>
  );
};
