import { Request, Response } from "express";
import { handleControllerError } from "../utils/handleControllerError.js";

type Data = "BTC" | "ETH" | "USDT" | "USDC";
type Cache = {
  data: Record<Data, number> | null;
  time: number;
};

const cache: Cache = {
  data: null,
  time: 0,
};

const TIMER = 60 * 60 * 1000;

export const getCurrency = async (req: Request, res: Response) => {
  try {
    const newDate = Date.now();
    const API_KEY = process.env.CURRENCY_CMC_PRO_API_KEY;

    if (!API_KEY) throw new Error("CURRENCY_CMC_PRO_API_KEY is not defined");

    if (cache.data && newDate - cache.time < TIMER) {
      return res.status(200).json({
        message: "currency received from cache",
        currency: cache.data,
      });
    }
    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,USDC&convert=USD",
      {
        headers: {
          Accept: "application/json",
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      },
    );

    if (!response.ok) throw new Error(`Currency API error: ${response.status}`);

    const result = await response.json();
    const { data: currentData } = result;
    const { BTC, ETH, USDT, USDC } = currentData;

    const normalizeData = {
      BTC: BTC.quote.USD.price,
      ETH: ETH.quote.USD.price,
      USDT: USDT.quote.USD.price,
      USDC: USDC.quote.USD.price,
    };

    cache.data = normalizeData;
    cache.time = newDate;

    return res.status(200).json({
      message: "currency received from server",
      currency: normalizeData,
    });
  } catch (error) {
    handleControllerError(error, res, " currency loading wrong", 400);
  }
};
