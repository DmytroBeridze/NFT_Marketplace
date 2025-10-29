import { useScrollContext } from '../../../app/providers';
import { useCloseBurgerMenu } from '../../../features/BurgerMenu';

export const useBurgerToggle = () => {
  const { closeBurger, openBurger } = useCloseBurgerMenu();
  const { lockScroll, unlockScroll, scroll } = useScrollContext();
  // --------close menu
  const closeBurgerMenu = () => {
    closeBurger();
    unlockScroll();
  };

  // ---------toggle menu
  const toggleBurgerMenu = () => {
    openBurger();
    scroll ? lockScroll() : unlockScroll();
  };

  return { closeBurgerMenu, toggleBurgerMenu };
};
