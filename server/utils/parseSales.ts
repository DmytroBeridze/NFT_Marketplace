import { ISales } from "../models/Nft.js";

type SalesInput = {
  isActive?: boolean;
  percent?: number;
  durationHours?: number;
};

export const parseSales = (salesData: SalesInput) => {
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
  // if (salesData.startAt) {
  //   sales.startAt = new Date(salesData.startAt);
  // }

  if (salesData.durationHours !== undefined) {
    const hours = Number(salesData.durationHours);
    if ([8, 12, 24, 48].includes(hours)) {
      const now = new Date();
      sales.startAt = now;
      sales.endAt = new Date(now.getTime() + hours * 60 * 60 * 1000);
    }
  }

  // if (salesData.endAt) {
  //   sales.endAt = new Date(salesData.endAt);
  // }

  if (Object.keys(sales).length > 0) return sales;
  return undefined;
};
