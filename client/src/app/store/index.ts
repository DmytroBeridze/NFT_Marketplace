import { configureStore, type Middleware } from '@reduxjs/toolkit';
import burgerReducer from '../../features/BurgerMenu/model/burgerSlice';

// ------Testing middleware
const testMiddleware: Middleware = (store) => (next) => (action: any) => {
  console.log('[Test action]:', action.type);
  return next(action);
};
// ------

export const store = configureStore({
  reducer: { burger: burgerReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(testMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
