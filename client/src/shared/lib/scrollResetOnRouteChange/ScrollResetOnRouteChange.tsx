import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useScrollContext } from '../../../app/providers';
import { useAppSelector } from '../../../app/store/reduxHooks';

export const ScrollResetOnRouteChange = () => {
  let location = useLocation();
  const { isOpen } = useAppSelector((store) => store.burger);
  const { unlockScroll, lockScroll } = useScrollContext();

  // коли бургер відкритий, але екран >= 835 щоб розблокувався скрол
  // а коли екран <835 і бузгер відкритий- то блокувався
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 1200) {
        unlockScroll();
      } else {
        if (isOpen) lockScroll();
        else unlockScroll();
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isOpen]);

  // при зміні роута (перехід на сторінку з бургер-меню) розблоковується скролл
  useEffect(() => {
    unlockScroll();
  }, [location.pathname]);

  return null;
};
