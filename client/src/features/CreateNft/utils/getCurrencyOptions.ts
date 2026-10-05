import type { Data } from '../../../shared/model';

export const getCurrencyOptions = (
  currency: Partial<Record<Data, number>> | undefined,
) => {
  const currencyOptions = Object.keys(currency ?? {}).map((currency) => ({
    id: currency as Data,
    name: currency as Data,
  }));

  return currencyOptions;
};

// type Currency = Exclude<Data, 'USD'>;

// export const useCurrencyOptions = (
//   currency: Record<Currency, number> | undefined,
// ) => {
//   const currencyOptions = Object.keys(currency ?? {}).map((currency) => ({
//     id: currency as Currency,
//     name: currency as Currency,
//   }));

//   const currentSourceCollections: { id: Data; name: Data }[] = [
//     // { id: 'USD', name: 'USD' },
//     ...currencyOptions,
//   ];

//   return currentSourceCollections;
// };
