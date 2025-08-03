import { createSlice } from '@reduxjs/toolkit';

interface BurgerState {
  isOpen: boolean;
}

const initialState: BurgerState = {
  isOpen: false,
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    open: (state) => {
      state.isOpen = true;
    },
    closed: (state) => {
      state.isOpen = false;
    },
  },
});

const { actions, reducer } = burgerSlice;
export const { toggle, closed, open } = actions;
export default reducer;
