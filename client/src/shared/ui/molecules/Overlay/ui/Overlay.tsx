import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../../../../app/store/reduxHooks.ts';
import { TransitionWrapper } from '../../../atoms/TransitionWrapper';
import {
  modalDefaultStyle,
  transitionStyles,
} from '../config/transitionStyles.ts.ts';
import { useToggleOverlay } from '../hooks/useToggleOverlay.ts';
import { useSetThemeMutation } from '../../../../../entities/user/model/userApi.ts';
import { useTheme } from '../../../../lib/theme/useTheme.ts';

interface OverlayProps {
  children?: React.ReactNode;
}

export const Overlay = ({ children }: OverlayProps) => {
  const [mounted, setMounted] = useState(false);

  const modalType = useAppSelector((store) => store.overlay.openModalType);
  const { closeHandler } = useToggleOverlay();
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
      inProp={modalType ? true : false}
      transitionStyles={transitionStyles}
      defaultStyle={modalDefaultStyle}
    >
      {({ style, ref }) => (
        <div
          ref={ref}
          style={style}
          className="fixed inset-0 flex items-center justify-center  bg-overlay-background-color z-[999] p-5"
          onClick={() => closeHandler()}
        >
          {children}
        </div>
      )}
    </TransitionWrapper>,

    root,
  );
};
