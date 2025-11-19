export type UserData = {
  _id: string;
  createdAt: string;
  roles: string[];
  updatedAt: string;
  userMail: string;
  userName: string;
  userType: 'client' | 'author';
  theme?: string;
};

export type Creator = {
  authorId: string;
  userName: string;
  avatar?: string | null;
  totalSales: number;
  totalRevenue: number;
};
