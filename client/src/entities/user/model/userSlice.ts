import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserData } from '../../../shared/types';
import { authApi } from '../../../features/AuthorizationModal/model';

// export type UserData = {
//   _id: string;

//   createdAt: string;
//   roles: string[];
//   updatedAt: string;
//   userMail: string;
//   userName: string;
//   userType: 'client' | 'author';
// };
interface UserState {
  data: UserData | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // addUserData: (state, action: PayloadAction<UserData>) => {
    //   state.data = action.payload;
    // },
    clearUser: (state) => {
      state.data = null;
    },
  },

  // ✅ Этот addMatcher – альтернатива ручному dispatch в компоненте.
  // Он автоматически обновляет состояние userSlice, когда login успешно выполнен.
  // Отличие от dispatch: здесь только обновление стейта,
  // нельзя делать побочные эффекты типа navigate или showToast.
  // Если нужна логика в компоненте (редирект, уведомление) – используем dispatch.
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.data = payload.userData;
        },
      )
      .addMatcher(
        authApi.endpoints.getMe.matchFulfilled,
        (state, { payload }) => {
          state.data = payload;
        },
      );
  },
});

export const { actions, reducer } = userSlice;
export const { clearUser } = actions;

export default reducer;
