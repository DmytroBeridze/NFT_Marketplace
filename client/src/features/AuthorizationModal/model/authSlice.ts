import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  IResponse,
  LoginValues,
  RegisterRequest,
} from '../../../shared/types';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/auth/' }),
  endpoints: (builder) => ({
    register: builder.mutation<IResponse, RegisterRequest>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<IResponse, LoginValues>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
