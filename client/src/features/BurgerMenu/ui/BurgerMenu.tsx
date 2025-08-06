import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/reduxHooks';
import { closed } from '../model/burgerSlice';

//! -------------------Transition---- винести налаштування окремо
import { type TransitionStatus } from 'react-transition-group';
import { TransitionWrapper } from '../../../shared/ui/atoms/TransitionWrapper';
const duration = 300;

const defaultStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: 'translateX(-110%)',
};

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: { transform: 'translateX(0)' },
  entered: { transform: 'translateX(0)' },
  exiting: { transform: 'translateX(-110%)' },
  exited: { transform: 'translateX(-110%)' },
  unmounted: {},
};

// --------------//-----Transition

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
          className={`fixed   burger-menue-responsive top-0 left-0 h-full   w-full bg-gray-950/80 z-[998] cursor-pointer`}
          onClick={closeBurger}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[65%] px-8 py-8 bg-primary-dark-accent-color  h-full cursor-default flex  flex-col gap-12"
          >
            {children}
          </div>
        </div>
      )}
    </TransitionWrapper>,
    root,
  );
};
