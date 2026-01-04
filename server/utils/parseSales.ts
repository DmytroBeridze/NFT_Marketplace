import { ISales } from "../models/Nft";

export const parseSales = (salesData: ISales) => {
  if (!salesData) return undefined;
  const sales: ISales = {};

  //   ---------isActive
  if (salesData.isActive !== undefined) {
    sales.isActive = salesData.isActive;
  }
  // ----------percent
  if (salesData.percent !== undefined) {
    const parsedPercent = Number(salesData.percent);
    if (!isNaN(parsedPercent) && parsedPercent >= 1 && parsedPercent <= 90) {
      sales.percent = parsedPercent;
    }
  }

  //   ----------time
  if (salesData.startAt) {
    sales.startAt = new Date(salesData.startAt);
  }

  if (salesData.endAt) {
    sales.endAt = new Date(salesData.endAt);
  }

  if (Object.keys(sales).length > 0) return sales;
  return undefined;
};
