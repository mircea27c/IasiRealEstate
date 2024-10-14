import { ApiNeighbourhoodPrice } from "./Api/ApiNeighbourhoodPrices";

export interface ChartHistoricData {
  timeStamp: string;
  prices: ApiNeighbourhoodPrice[];
}
