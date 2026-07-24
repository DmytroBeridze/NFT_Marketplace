import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  FollowersCountResponse,
  GetFollowingResponse,
  IsFollowingResponse,
  MessageResponse,
} from './tipes';

export const subscribeFollowersApi = createApi({
  reducerPath: 'subscribeFollowersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || `http://localhost:3002/api/`,
  }),
  endpoints: (build) => ({
    // ---------------follow

    followAuthor: build.mutation<MessageResponse, string>({
      query: (id) => ({ url: `follow/${id}`, method: 'POST' }),
    }),

    // ----------delete follow
    deleteFollow: build.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `follow/${id}`,
        method: 'DELETE',
      }),
    }),
    // --------check following
    checkFollowing: build.query<IsFollowingResponse, string>({
      query: (id) => `follow/check/${id}`,
    }),

    // --------get following
    getFollowing: build.query<GetFollowingResponse, void>({
      query: () => 'follow/following',
    }),

    // --------get followers
    getFollowersById: build.query<FollowersCountResponse, string>({
      query: (id) => `follow/followers/${id}`,
    }),
  }),
});

export const {
  useFollowAuthorMutation,
  useDeleteFollowMutation,
  useCheckFollowingQuery,
  useGetFollowingQuery,
  useGetFollowersByIdQuery,
} = subscribeFollowersApi;
