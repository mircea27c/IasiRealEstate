import React, { useState } from "react";
import HistoricPriceChart from "./subcomponents/HistoricPriceChart";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import { ApiHistoricPrices } from "../../models/Api/ApiHistoricPrices";
import useGetApiClient from "../../clients/useGetApiClient";

const HistoricPriceSection: React.FC = () => {
  const { data, loading, error } = useGetApiClient<ApiHistoricPrices>(
    "/get-historic-prices?startDate=2024-01-01&endDate=2025-01-01",
  );
  if (loading || !data || data.historicPrices.length == 0)
    return <LoadingSpinner />;

  return <HistoricPriceChart data={data.historicPrices} />;
};
export default HistoricPriceSection;
