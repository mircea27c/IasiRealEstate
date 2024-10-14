export interface NeighbourhoodPriceData {
  neighbourhood: string;
  amount: number;
}
interface PricePerNeighbourhoodResponse {
  prices: NeighbourhoodPriceData[];
}

export default PricePerNeighbourhoodResponse;
