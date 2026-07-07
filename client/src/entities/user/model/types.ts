export type UserData = {
  _id: string;
  createdAt: string;
  updatedAt: string;

  userName: string;
  userMail: string;
  avatar?: string;
  avatarDeleteUrl?: string;
  coverImage?: string;
  coverImageDeleteUrl?: string;
  userType: 'client' | 'author';
  theme?: string;
  roles: string[];
};

export type Creator = {
  authorId: string;
  userName: string;
  avatar?: string | null;
  totalSales: number;
  totalRevenue: number;
};
