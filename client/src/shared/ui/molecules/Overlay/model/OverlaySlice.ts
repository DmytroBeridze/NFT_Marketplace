import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type OpenModalType = 'authorization' | 'burgerMenu' | null;

export interface OverlayState {
  openModalType: OpenModalType;
}

const initialState: OverlayState = {
  openModalType: null,
};

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.openModalType = null;
    },
    openModal: (
      state,
      action: PayloadAction<OverlayState['openModalType']>,
    ) => {
      state.openModalType = action.payload;
    },
  },
});

export const { actions, reducer } = overlaySlice;
export const { closeModal, openModal } = actions;
export default reducer;
