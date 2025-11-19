import {
  NavigationPanel,
  type NavItemTuple,
} from '../../../features/navigation';
import { HeaderLogo } from '../../../shared/ui/molecules/HeaderLogo/ui/HeaderLogo';
import { useTranslate } from '../../../shared/lib/i18n/useTranslate';
import type { NavItems } from '../../../features/BurgerMenu/model';

export const Navigation = () => {
  const { lang, translateVariables } = useTranslate<NavItems>({
    translateKey: 'nav',
    returnObjects: true,
  });
  const navItems = Object.entries(translateVariables) as NavItemTuple[];

  return (
    <nav className=" flex items-center justify-between basis-[92%] mr-7">
      <HeaderLogo />
      <NavigationPanel
        navItems={navItems}
        lang={lang}
        classNameList="items-center justify-center gap-nav-responsive hidden navigation-responsive"
        classNameItem=" relative after:absolute after:left-0  after:bottom-[-2px] after:h-0.5 after:w-full link-underline after:origin-center after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease  hover:after:scale-x-100"
      />
    </nav>
  );
};
