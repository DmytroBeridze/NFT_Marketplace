import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/reduxHooks';
import { closed } from '../model/burgerSlice';

import { TransitionWrapper } from '../../../shared/ui/atoms/TransitionWrapper';
import { defaultStyle, transitionStyles } from '../config/transitionStyles';
import { Icon } from '../../../shared/ui/atoms/Icon';

interface burgerMenuProps {
  children?: React.ReactNode;
}

export const BurgerMenu = ({ children }: burgerMenuProps) => {
  const [mounted, setMounted] = useState(false);
  const behavior = useAppSelector((state) => state.burger.isOpen);
  const dispatch = useAppDispatch();

  const closeBurger = () => {
    dispatch(closed());
  };

  // useEffect с пустым массивом зависимостей ставит mounted в true после первого рендера,
  // чтобы гарантировать, что следующий код (например, доступ к DOM) выполняется только на клиенте,
  // когда DOM уже загружен —  находится root ждя портала.

  // Иначе document.getElementById('burger-root') может сработать слишком рано

  // Если BurgerMenu вызывается до того, как DOM полностью загрузился
  // (например, до монтирования #burger-root в index.html), тогда getElementById вернёт null.

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const root = document.getElementById('burger-root');
  if (!root) return null;

  return createPortal(
    <TransitionWrapper
      inProp={behavior}
      transitionStyles={transitionStyles}
      defaultStyle={defaultStyle}
    >
      {({ style, ref }) => (
        <div
          ref={ref}
          style={style}
          className={`fixed burger-menue-responsive top-0 left-0 h-full   w-full bg-overlay-background-color z-[998] cursor-pointer`}
          onClick={closeBurger}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[72%] px-8 py-8 bg-burger-background-color  h-full cursor-default flex  flex-col gap-18 overflow-y-auto max-h-screen relative 
            "
          >
            {children}
          </div>
        </div>
      )}
    </TransitionWrapper>,
    root,
  );
};
