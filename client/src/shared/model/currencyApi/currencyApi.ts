import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Data = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'USD';
type Currency = {
  message: string;
  currency: Record<Data, number>;
};

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getCurrency: build.query<Currency, void>({
      query: () => `/currency/get`,
    }),
  }),
});

export const { useGetCurrencyQuery } = currencyApi;
