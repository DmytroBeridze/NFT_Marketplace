import { configureStore, type Middleware } from '@reduxjs/toolkit';
import burgerReducer from '../../features/BurgerMenu/model/burgerSlice';
import overlayReducer from '../../shared/ui/molecules/Overlay/model/OverlaySlice';
import userReducer from '../../entities/user/model/userSlice';
import { authApi } from '../../features/AuthorizationModal/model';
import { userApi } from '../../entities/user/model';
import { statisticsApi } from '../../widgets/MarketplaceHero/model/statisticApi';
// ------Testing middleware
const testMiddleware: Middleware = (store) => (next) => (action: any) => {
  console.log('[Test action]:', action.type);
  return next(action);
};
// ------

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    overlay: overlayReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(statisticsApi.middleware)

      .prepend(testMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
