import { useEffect, useState } from 'react';
import { Icon } from '../Icon';

const ScrollToTopButton = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else setShow(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlescrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div onClick={handlescrollUp}>
      <Icon
        data-testid="icon-mock"
        name="doubleUp-icon"
        className={`static-text-purple-color hover:opacity-60 fixed bottom-14 right-14 cursor-pointer z-50
        ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity  duration-300 ease-in-out`}
        fill="none"
        size={40}
      />
    </div>
  );
};

export default ScrollToTopButton;
