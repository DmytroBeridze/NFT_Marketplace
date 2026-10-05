export type Currency = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'USD';

type SelectValue = { id: string | null; name: string };

export type FormValues = {
  name: string;
  description: string;
  keywords: string;
  category: SelectValue;
  collection: SelectValue;
  price: string;
  currency: { id: Currency; name: Currency };
  royalty: SelectValue;
  duration: SelectValue;
  isForSale: boolean;
  file: File | null;
};

export type CategoryItem = { _id: string | null; name: string };

export type CategoryFieldProps = {
  categories: CategoryItem[];
};
