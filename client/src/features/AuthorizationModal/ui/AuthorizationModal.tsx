import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../../app/store/reduxHooks';
import { TransitionWrapper } from '../../../shared/ui/atoms/TransitionWrapper';
import { useToggleAuthorizationModal } from '../hooks/useToggleAuthorizationModal';
import {
  modalDefaultStyle,
  transitionStyles,
} from '../config/transitionStyles.ts';

export const AuthorizationModal = () => {
  const [mounted, setMounted] = useState(false);
  const { toggleHandler } = useToggleAuthorizationModal();
  const isOpen = useAppSelector((store) => store.authorizationModal.isOpen);
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

  const root = document.getElementById('authorizationModal-root');

  if (!root) {
    return null;
  }

  return createPortal(
    <TransitionWrapper
      inProp={isOpen}
      transitionStyles={transitionStyles}
      defaultStyle={modalDefaultStyle}
    >
      {({ style, ref }) => (
        <div
          ref={ref}
          style={style}
          className="fixed top-0 w-full h-full bg-amber-700 z-[999]"
        >
          <button onClick={toggleHandler}>Test btn</button>
          <p>This child is placed in the document body.</p>
        </div>
      )}
    </TransitionWrapper>,

    root,
  );
};
