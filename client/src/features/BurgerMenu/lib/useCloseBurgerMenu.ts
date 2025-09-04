import { useAppDispatch } from '../../../app/store/reduxHooks';
import { closed, open } from '../model/burgerSlice';

export const useCloseBurgerMenu = () => {
  const dispatch = useAppDispatch();

  const closeBurger = () => {
    dispatch(closed());
  };
  const openBurger = () => {
    dispatch(open());
  };
  return { closeBurger, openBurger };
};
