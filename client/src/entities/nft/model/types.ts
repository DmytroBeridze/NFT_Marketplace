export interface INft {
  _id: string;
  name: string;
  description: string;
  authorId: { _id: string; userName: string; avatar?: string };
  gallery?: { _id: string; name: string };
  category?: string;
  price: number;
  sold?: boolean;
  imageUrl: string;
  deleteImageUrl: string;
  keywords: string[];

  likes?: string[];
  views?: number;
  rating?: number;
}

export interface TrendingNft extends Omit<INft, 'authorId' | 'gallery'> {
  authorId: string;
  gallery: string;
  createdAt?: string;
  updatedAt?: string;
}
