import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ConfigType } from './types';

export const salesConfigApi = createApi({
  reducerPath: 'salesConfigApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getSalesConfigApi: build.query<ConfigType, void>({
      query: () => '/sales/config',
    }),
  }),
});

export const { useGetSalesConfigApiQuery } = salesConfigApi;
