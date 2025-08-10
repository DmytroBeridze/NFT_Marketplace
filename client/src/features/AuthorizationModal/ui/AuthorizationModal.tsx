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

  const buttonsName = ['Login', 'Sign Up'] as const;
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
          className="fixed inset-0 flex items-center justify-center  bg-overlay-background-color z-[999] "
        >
          <button onClick={toggleHandler}>Test btn</button>
          <div className=" w-full h-full max-w-150 max-h-120 bg-static-surface rounded-lg">
            <ul className="w-full  flex justify-between">
              {buttonsName.map((elem, i) => {
                return (
                  <li
                    key={elem}
                    className={`flex justify-center items-center basis-1/2 p-5 cursor-pointer  ${i === 1 ? 'rounded-tr-lg' : 'rounded-tl-lg'} bg-amber-200`}
                    onClick={() => console.log('click')}
                  >
                    {elem}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </TransitionWrapper>,

    root,
  );
};
