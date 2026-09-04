export type CategoriesType =
  | 'Art'
  | 'Collectibles'
  | 'Music'
  | 'Photography'
  | 'Gaming'
  | 'Fantasy'
  | 'Sports'
  | 'Virtual Worlds';

export type Category = {
  _id: string | null;
  name: string;
};
