import { useAppDispatch, useAppSelector } from '../../app/store/reduxHooks';
import { Outlet, useNavigate } from 'react-router';
import { useToggleOverlay } from '../ui/molecules/Overlay';
import { clearUser } from '../../entities/user/model';
import { useEffect } from 'react';
import { useGetMeQuery } from '../../features/AuthorizationModal/model';
import { useLocalStorage } from '../lib/hooks';

export const ProtectedRoute = () => {
  const { getLocal, removeLocal } = useLocalStorage();
  const user = useAppSelector((state) => state.user.data);
  const { openHandler } = useToggleOverlay();
  const token = getLocal('token');
  // const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    /*
  ✅ при перезавантаженні з dashbord доки стан юзера в userSlice тільки завантажується
  спрацює перевірка !user і відкриє модалку реєстрації.
  if (isLoading) return не дає спрацювати цій перевірці, доки стан юзера
  не буде точно завартажений
*/
    if (isLoading) return;
    if (!token || !user) {
      openHandler('authorization');
      removeLocal('token');
      // localStorage.removeItem('token');
      dispatch(clearUser());
      navigate('/', { replace: true });
    }
  }, [token, user, dispatch, openHandler, isLoading]);

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
