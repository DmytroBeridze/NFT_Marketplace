import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // });
  }, [location]);

  return null;
};
