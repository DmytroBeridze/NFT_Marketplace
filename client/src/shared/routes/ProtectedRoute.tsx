import { useAppDispatch, useAppSelector } from '../../app/store/reduxHooks';
import { Outlet, useNavigate } from 'react-router';
import { useToggleOverlay } from '../ui/molecules/Overlay';
import { useGetMeQuery } from '../../features/AuthorizationModal/model';
import { clearUser } from '../../entities/user/model';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.user.data);
  const { openHandler } = useToggleOverlay();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  // const { isError, isLoading } = useGetMeQuery(undefined, { skip: !token });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token || !user) {
      openHandler('authorization');
      localStorage.removeItem('token');
      dispatch(clearUser());
      navigate('/', { replace: true });
    }
  }, [token, user, dispatch, openHandler]);

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key === 'token') {
        openHandler('authorization');
        dispatch(clearUser());
        navigate('/', { replace: true });
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [openHandler, dispatch, navigate]);

  return <Outlet />;
};
