import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subscribeApi = createApi({
  reducerPath: 'subscribeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/api/subscribe/',
  }),
  endpoints: (builder) => ({
    setSubscribeEmail: builder.mutation<
      { message: 'string' },
      { email: string }
    >({
      query: (body) => ({
        url: 'set/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSetSubscribeEmailMutation } = subscribeApi;
