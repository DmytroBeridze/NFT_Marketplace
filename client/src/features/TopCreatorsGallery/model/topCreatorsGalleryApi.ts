import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TopAuthors = {
  totalSales: number;
  totalRevenue: number;
  authorId: string;
  userName: string;
  avatar: string;
};

interface ITopCreators {
  message: string;
  topAuthors: TopAuthors[];
}

export const topCreatorsGalleryApi = createApi({
  reducerPath: 'topCreatorsGalleryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getTopCreators: build.query<ITopCreators, void>({
      query: () => '/nfts/topAuthors',
    }),
  }),
});

export const { useGetTopCreatorsQuery } = topCreatorsGalleryApi;
