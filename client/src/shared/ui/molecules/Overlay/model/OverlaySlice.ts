import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface OverlayState {
  openModalType: 'authorization' | 'profile' | null;
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
