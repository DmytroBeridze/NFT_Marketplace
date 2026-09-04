import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CategoryItem } from '../../CreateNft/model';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getCategories: build.query<CategoryItem[], void>({
      query: () => `/category`,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
