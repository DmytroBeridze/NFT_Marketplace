import { useAppDispatch } from '../../../../../app/store/reduxHooks';
import {
  closeModal,
  openModal,
  type OverlayState,
} from '../model/OverlaySlice';

export const useToggleOverlay = () => {
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(closeModal());
  };
  const openHandler = (modalType: OverlayState['openModalType']) => {
    dispatch(openModal(modalType));
  };
  return { closeHandler, openHandler };
};
