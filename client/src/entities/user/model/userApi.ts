import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IRegisterResponse } from '../../../shared/types';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { clearUser } from './userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3002/api/',

  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // clear local storage
    localStorage.removeItem('token');
    // logout
    api.dispatch(clearUser());
  }
  return result;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // get user
    getMe: builder.query<IRegisterResponse, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
    }),
    // set cookie theme
    setTheme: builder.mutation<
      { message: string; theme: 'light' | 'dark' },
      void
    >({
      query: () => ({
        url: 'theme',
        method: 'PATCH',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetMeQuery, useSetThemeMutation } = userApi;
