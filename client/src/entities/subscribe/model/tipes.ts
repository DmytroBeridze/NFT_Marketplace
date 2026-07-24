import type { UserData } from '../../user/model';

export type FollowersCountResponse = {
  followersCount: number;
};

export type IsFollowingResponse = {
  isFollowing: boolean;
};

export type GetFollowingResponse = {
  authors: UserData[];
};

export type MessageResponse = {
  message: string;
};
