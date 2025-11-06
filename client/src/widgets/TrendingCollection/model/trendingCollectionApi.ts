import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TrendingNft } from '../../../entities/nft/model';

interface TrendingGallery {
  _id: string;
  name: string;
  avgRating: number;
  nfts: TrendingNft[];
  nftsQuantity: number;
  author: string;
  authorAvatar: string;
  authorId: string;
}

interface TrendingCollection {
  message: string;
  galleries: TrendingGallery[];
}

export const trendingCollectionApi = createApi({
  reducerPath: 'trendingCollectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getTrendingCollection: build.query<TrendingCollection, void>({
      query: () => '/galleries/top',
    }),
  }),
});
export const { useGetTrendingCollectionQuery } = trendingCollectionApi;
