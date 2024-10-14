import { NeighbourhoodPriceData } from "./PricePerNeighbourhoodResponse";

interface HistoricPrice {
  timestamp: string;
  prices: NeighbourhoodPriceData[];
}
interface HistoricPricesResponse {
  historicPrices: HistoricPrice[];
}

export default HistoricPricesResponse;
