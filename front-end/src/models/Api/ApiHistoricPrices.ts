import { ApiNeighbourhoodPrice } from "./ApiNeighbourhoodPrices";

export interface ApiHistoricPrice {
  timestamp: string;
  prices: ApiNeighbourhoodPrice[];
}
export interface ApiHistoricPrices {
  historicPrices: ApiHistoricPrice[];
}
