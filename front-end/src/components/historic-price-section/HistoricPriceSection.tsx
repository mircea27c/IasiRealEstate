import React, { useEffect, useState } from "react";
import HistoricPriceChart from "./subcomponents/HistoricPriceChart";
import { ApiHistoricPrices } from "../../models/Api/ApiHistoricPrices";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

const HistoricPriceSection: React.FC = () => {
  const [pricesData, setPricesData] = useState<ApiHistoricPrices | undefined>(
    undefined,
  );

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/get-historic-prices?startDate=2024-10-14T16:43:00Z&endDate=2025-01-01`,
    )
      .then((response) => response.json())
      .then((data) => setPricesData(data))
      .catch((err) => console.log(`Error occurred when fetching: ${err}`));
  }, []);

  if (!pricesData) return <LoadingSpinner />;

  return <HistoricPriceChart data={pricesData.historicPrices} />;
};
export default HistoricPriceSection;
