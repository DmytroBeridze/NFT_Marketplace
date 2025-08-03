import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface burgerMenuProps {
  children?: React.ReactNode;
}

export const BurgerMenu = ({ children }: burgerMenuProps) => {
  const [mounted, setMounted] = useState(false);
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

  // return (
  //   <div className="fixed top-0 left-0 h-full w-[300px] bg-red-950 z-50">
  //     {children}
  //   </div>
  // );
  return createPortal(
    <div className="fixed top-0 left-0 h-full max-w-[500px] w-full bg-purple-800 z-[999]">
      {children}
    </div>,
    root,
  );
};

// Transition --------------обернуть для анимации!!!
