export interface ApiNeighbourhoodPrice {
  neighbourhood: string;
  amount: number;
}
export interface ApiNeighbourhoodPrices {
  prices: ApiNeighbourhoodPrice[];
}
