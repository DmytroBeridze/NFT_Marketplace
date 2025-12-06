import { configureStore, type Middleware } from '@reduxjs/toolkit';
import burgerReducer from '../../features/BurgerMenu/model/burgerSlice';
import overlayReducer from '../../shared/ui/molecules/Overlay/model/OverlaySlice';
import userReducer from '../../entities/user/model/userSlice';
import { authApi } from '../../features/AuthorizationModal/model';
import { userApi } from '../../entities/user/model';
import { statisticsApi } from '../../features/MarketplaceHero/model/statisticApi';
import { topNftApi } from '../../features/MarketplaceHero/model/topNftApi';
import { trendingCollectionApi } from '../../features/TrendingCollection/model';
import { topCreatorsGalleryApi } from '../../features/TopCreatorsGallery/model/index';

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
    [topNftApi.reducerPath]: topNftApi.reducer,
    [trendingCollectionApi.reducerPath]: trendingCollectionApi.reducer,
    [topCreatorsGalleryApi.reducerPath]: topCreatorsGalleryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(statisticsApi.middleware)
      .concat(topNftApi.middleware)
      .concat(trendingCollectionApi.middleware)
      .concat(topCreatorsGalleryApi.middleware)

      .prepend(testMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
