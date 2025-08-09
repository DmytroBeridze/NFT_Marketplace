import { useAppDispatch } from '../../../app/store/reduxHooks';
import { toggle } from '../model/AuthorizationModalSlice';

export const useToggleAuthorizationModal = () => {
  const dispatch = useAppDispatch();

  const toggleHandler = () => {
    dispatch(toggle());
  };
  return { toggleHandler };
};
