import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateNftDto, getNftsByUserIdParams, INft } from './types';

type fileResponse = {
  message: 'imageUploaded';
  imageUrl: string;
  deleteImageUrl: string;
  imageTitle: string;
};

export const nftApi = createApi({
  reducerPath: 'nftApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',

    // ---------------------------prepareHeaders
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // --------------------------------top NFTS
    getTopNfts: builder.query<{ items: INft[] }, number | void>({
      query: (limit) => `/nfts/byRating?limit=${limit}`,
    }),

    // ---------------------------NFTS by data
    getNftsByCreateDate: builder.query<{ items: INft[] }, number | void>({
      query: (limit) => `/nfts/byDate?limit=${limit}`,
    }),

    // ---------------------------NFTS by parameters

    getNfts: builder.query<{ items: INft[] }, getNftsByUserIdParams>({
      query: (params) => ({ url: '/nfts', params }),
    }),

    // ---------------------------set NFT
    setNFT: builder.mutation<{ message: string; item: INft }, CreateNftDto>({
      query: (body) => ({
        url: '/nfts',
        method: 'POST',
        body,
      }),
    }),
    // ---------------------------set NFT

    uploadImage: builder.mutation<fileResponse, FormData>({
      query: (body) => ({
        url: '/nfts/imgUpload',
        method: 'POST',

        body,
      }),
    }),
  }),
});

export const {
  useGetTopNftsQuery,
  useGetNftsByCreateDateQuery,
  useGetNftsQuery,
  useSetNFTMutation,
  useUploadImageMutation,
} = nftApi;
