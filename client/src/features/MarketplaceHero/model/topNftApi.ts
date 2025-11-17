import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { INft } from '../../../entities/nft/model';

// export interface INft {
//   _id: string;
//   name: string;
//   description: string;
//   authorId: { _id: string; userName: string; avatar?: string };
//   gallery?: { _id: string; name: string };
//   category?: string;
//   price: number;
//   sold?: boolean;
//   imageUrl: string;
//   deleteImageUrl: string;
//   keywords: string[];

//   likes?: string[];
//   views?: number;
//   rating?: number;
// }

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
