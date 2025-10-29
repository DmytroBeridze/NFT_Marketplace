import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Istatistics {
  message: string;
  statistics: {
    artists: number;
    images: number;
    totalSale: number;
  };
}

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getStatistics: build.query<Istatistics, void>({
      query: () => `statistics`,
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
