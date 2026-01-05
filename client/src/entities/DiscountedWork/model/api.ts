import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { INft } from '../../nft/model';

export const discountedWorkApi = createApi({
  reducerPath: 'discountedWorkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getNFTBySale: build.query<INft, void>({
      query: () => '/nfts/bysale',
    }),
  }),
});

export const { useGetNFTBySaleQuery } = discountedWorkApi;
