import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ILoginResponse,
  IRegisterResponse,
  LoginValues,
  RegisterRequest,
} from '../../../shared/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/api',
  }),
  endpoints: (builder) => ({
    // register
    register: builder.mutation<IRegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    // login
    login: builder.mutation<ILoginResponse, LoginValues>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type {
//   ILoginResponse,
//   IRegisterResponse,
//   LoginValues,
//   RegisterRequest,
//   UserData,
// } from '../../../shared/types';
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query';
// import { clearUser } from '../../../entities/user/model';
// import { openModal } from '../../../shared/ui/molecules/Overlay';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:3002/api/auth/',
//   prepareHeaders: (headers, { getState, endpoint }) => {
//     const token = localStorage.getItem('token');

//     if (token && endpoint !== 'login' && endpoint !== 'register') {
//       headers.set('authorization', `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     // clear local storage
//     localStorage.removeItem('token');
//     // logout
//     api.dispatch(clearUser());

//     // open modal
//     // api.dispatch(openModal('authorization'));
//   }

//   return result;
// };

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({
//     register: builder.mutation<IRegisterResponse, RegisterRequest>({
//       query: (body) => ({
//         url: 'register',
//         method: 'POST',
//         body,
//       }),
//     }),
//     login: builder.mutation<ILoginResponse, LoginValues>({
//       query: (body) => ({
//         url: 'login',
//         method: 'POST',
//         body,
//       }),
//     }),

//     getMe: builder.query<IRegisterResponse, void>({
//       query: () => ({
//         url: `me`,
//         method: 'GET',
//         // headers: {},
//       }),
//     }),
//   }),
// });

// export const { useRegisterMutation, useLoginMutation, useGetMeQuery } = authApi;
