export interface ISales {
  isActive?: boolean;
  percent?: string;
  startAt?: Date;
  durationHours?: string;
  // endAt?: Date;
}

export interface INft {
  _id: string;
  name: string;
  description: string;
  authorId: { _id: string; userName: string; avatar?: string };
  gallery?: { _id: string; name: string };
  category?: string;
  sold?: boolean;
  imageUrl: string;
  deleteImageUrl: string;
  keywords: string[];

  likes?: string[];
  views?: number;
  rating?: number;

  sales?: ISales;
  isSaleActive: boolean;
  salePrice?: null | number;
  price: number;
}

export interface CreateNftDto {
  name: string;
  description: string;
  galleryId?: string | null;
  categoryId?: string | null;
  price: number;
  keywords: string[] | string;
  imageUrl: string;
  deleteImageUrl: string;

  isActive?: boolean;
  percent?: string;
  durationHours?: string;
}
// export interface CreateNftDto {
//   name: string;
//   description: string;
//   imageUrl: string;
//   deleteImageUrl: string;

//   galleryId?: string;
//   categoryId?: string;
//   price: number;

//   keywords: string[] | string;

//   sales?: ISales;
// }

export interface TrendingNft extends Omit<INft, 'authorId' | 'gallery'> {
  authorId: string;
  gallery: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface getNftsByUserIdParams {
  authorId?: string;
  ownerId?: string;
  galleryId?: string;
  categoryId?: string;
  sold?: boolean;
  page?: number;
  limit?: number;
  keywords?: string[];
}
