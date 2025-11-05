export const numberFormatter = (num: number) => {
  if (!num) return 0;
  if (num > 10000 && num < 1000000) {
    return Math.floor(num / 1000) + 'k+';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
  } else return num.toString();
};

export const quantityFormatter = (num: number, limit: number) => {
  if (!num || Number.isNaN(num)) return '0';
  if (num <= 0) return 0;

  if (num >= limit) {
    return `${limit}+`;
  } else return String(num);
};
