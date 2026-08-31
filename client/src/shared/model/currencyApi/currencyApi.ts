import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Data = 'BTC' | 'ETH' | 'USDT' | 'USDC';

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api' }),
  endpoints: (build) => ({
    getCurrency: build.query<Record<Data, number>, void>({
      query: () => `/currency/get`,
    }),
  }),
});

export const { useGetCurrencyQuery } = currencyApi;
