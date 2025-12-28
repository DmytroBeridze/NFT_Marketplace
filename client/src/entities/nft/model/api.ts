import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { INft } from './types';

// --------------------------------top NFTS

export const topNftApi = createApi({
  reducerPath: 'topNftApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (builder) => ({
    getTopNfts: builder.query<{ items: INft[] }, number | void>({
      query: (limit) => `/nfts/byRating?limit=${limit}`,
    }),
  }),
});

export const { useGetTopNftsQuery } = topNftApi;

// ---------------------------NFTS by data

export const getNftsByCreateDateApi = createApi({
  reducerPath: 'getNftsByCreateDateApi',
  baseQuery:
    import.meta.env.VITE_API_URL ||
    fetchBaseQuery({ baseUrl: 'http://localhost:3002/api' }),
  endpoints: (build) => ({
    getNftsByCreateDate: build.query<{ items: INft[] }, number | void>({
      query: (limit) => `/nfts/byDate?limit=${limit}`,
    }),
  }),
});

export const { useGetNftsByCreateDateQuery } = getNftsByCreateDateApi;
