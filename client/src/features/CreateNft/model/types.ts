import type { Data } from '../../../shared/model';

export type FormValues = {
  name: string;
  description: string;
  keywords: string;
  category: { id: string; name: string };
  collection: { id: string; name: string };
  price: string;
  currency: { id: Data; name: Data };
  royalty: string;
  duration: string;
  isForSale: boolean;
};

export type CategoryItem = { _id: string | null; name: string };

export type CategoryFieldProps = {
  categories: CategoryItem[];
};
