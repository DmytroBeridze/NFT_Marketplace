import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { INft } from '../../nft/model';

export const discountedWorkApi = createApi({
  reducerPath: 'discountedWorkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getNFTBySale: build.query<{ items: INft }, void>({
      query: () => '/nfts/bysale',
    }),
  }),
});

export const { useGetNFTBySaleQuery } = discountedWorkApi;
