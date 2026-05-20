import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../../../../app/store/reduxHooks.ts';
import {
  modalDefaultStyle,
  transitionStyles,
} from '../config/transitionStyles.ts.ts';
import { useToggleOverlay } from '../hooks/useToggleOverlay.ts';
import type { OpenModalType } from '../model/OverlaySlice.ts';
import { Icon, TransitionWrapper } from '../../../atoms/index.ts';

interface OverlayProps {
  children?: React.ReactNode;
  modalType: OpenModalType;
}

export const Overlay = ({ children, modalType }: OverlayProps) => {
  const [mounted, setMounted] = useState(false);

  const openModalType = useAppSelector((store) => store.overlay.openModalType);
  const { closeHandler } = useToggleOverlay();

  // useEffect с пустым массивом зависимостей ставит mounted в true после первого рендера,
  // чтобы гарантировать, что следующий код (например, доступ к DOM) выполняется только на клиенте,
  // когда DOM уже загружен —  находится root для портала модалки.
  // Без этого document.getElementById('authorizationModal-root') может вернуть null.
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
      inProp={openModalType === modalType ? true : false}
      transitionStyles={transitionStyles}
      defaultStyle={modalDefaultStyle}
    >
      {({ style, ref }) => (
        <section
          ref={ref}
          style={style}
          className="fixed inset-0 flex items-center justify-center 
          bg-overlay-background-color z-[999] p-5"
          onClick={() => closeHandler()}
        >
          <div className="relative w-full max-w-150 overflow-y-auto max-h-[90vh] ">
            {/* ----------- button close */}
            <div className="flex justify-end sticky  -top-8 ">
              <Icon
                className="cursor-pointer"
                style={{ color: 'white' }}
                onClick={() => closeHandler()}
                name="close-icon"
                // fill="black"
              />
            </div>
            {children}
          </div>
        </section>
      )}
    </TransitionWrapper>,

    root,
  );
};
