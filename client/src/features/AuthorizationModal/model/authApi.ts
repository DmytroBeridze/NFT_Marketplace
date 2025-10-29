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
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
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
