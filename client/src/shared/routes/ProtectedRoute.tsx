import { useAppSelector } from '../../app/store/reduxHooks';
import { Navigate, Outlet } from 'react-router';
import { useToggleOverlay } from '../ui/molecules/Overlay';

export const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.user.data);
  const { openHandler } = useToggleOverlay();

  if (!user) {
    localStorage.removeItem('token');

    openHandler('authorization');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
