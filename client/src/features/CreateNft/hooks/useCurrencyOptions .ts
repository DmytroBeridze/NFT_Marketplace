import type { Data } from '../../../shared/model';

type Currency = Exclude<Data, 'USD'>;

export const useCurrencyOptions = (
  currency: Record<Currency, number> | undefined,
) => {
  const currencyOptions = Object.keys(currency ?? {}).map((currency) => ({
    id: currency as Currency,
    name: currency as Currency,
  }));

  const currentSourceCollections: { id: Data; name: Data }[] = [
    { id: 'USD', name: 'USD' },
    ...currencyOptions,
  ];

  return currentSourceCollections;
};
