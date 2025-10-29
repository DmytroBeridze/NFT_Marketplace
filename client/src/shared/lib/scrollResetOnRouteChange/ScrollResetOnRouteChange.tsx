import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useScrollContext } from '../../../app/providers';

export const ScrollResetOnRouteChange = () => {
  let location = useLocation();
  const { unlockScroll } = useScrollContext();
  useEffect(() => {
    unlockScroll();
  }, [location.pathname]);

  return null;
};
