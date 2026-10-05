// export const totalPriceCalc = (
//   price: number,
//   royalty: number,
//   isForSale: boolean,
// ) => {
//   return isForSale ? (price - (price * royalty) / 100).toFixed(2) : price;
// };
export const totalPriceCalc = (
  price: number,
  royalty: number,
  isForSale: boolean,
) => {
  return isForSale
    ? (price - (price * royalty) / 100).toFixed(2)
    : price.toFixed(2);
};
