import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

export const authorizationModalSlice = createSlice({
  name: 'authorizationModal',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    close: (state) => {
      state.isOpen = false;
    },
    open: (state) => {
      state.isOpen = true;
    },
  },
});

export const { actions, reducer } = authorizationModalSlice;
export const { toggle, close, open } = actions;
export default reducer;
