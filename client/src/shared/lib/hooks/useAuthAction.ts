import { useAppDispatch, useAppSelector } from '../../../app/store/reduxHooks';
import { clearUser } from '../../../entities/user/model';
import { useToggleOverlay } from '../../ui/molecules/Overlay';
import { useLocalStorage } from './useLocalStorage';

export const useAuthAction = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const { openHandler } = useToggleOverlay();

  const loginLogoutHandler = () => {
    const { removeLocal } = useLocalStorage();
    user ? dispatch(clearUser()) : openHandler('authorization');
    removeLocal('token');
    // localStorage.removeItem('token');
  };

  return { loginLogoutHandler, user };
};
