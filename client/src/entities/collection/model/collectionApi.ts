import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { CategoryItem } from '../../../features/CreateNft/model';

// Define a service using a base URL and expected endpoints
export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getCollection: build.query<{ galleries: CategoryItem[] }, string>({
      query: (id) => `/galleries?authorId=${id}`,
    }),
  }),
});

export const { useGetCollectionQuery } = collectionApi;
