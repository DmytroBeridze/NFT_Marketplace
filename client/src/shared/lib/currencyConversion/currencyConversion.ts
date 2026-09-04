export const convertCurrencyToUsd = (value: number, rate: number): number => {
  if (rate <= 0) {
    throw new Error('Currency rate must be greater than 0');
  }

  return value * rate;
};

export const convertUsdToCurrency = (value: number, rate: number): number => {
  if (rate <= 0) {
    throw new Error('Currency rate must be greater than 0');
  }

  return value / rate;
};
