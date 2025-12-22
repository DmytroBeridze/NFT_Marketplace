import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Category = {
  _id: string;
  name: string;
};

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
  }),
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => `/category`,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
