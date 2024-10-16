import React, { useEffect, useState } from "react";
import { ApiNeighbourhoodPrices } from "../../models/Api/ApiNeighbourhoodPrices";
import { FeatureCollection } from "geojson";
import NeighbourhoodsMap from "./subcomponents/NeighbourhoodsMap";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import useGetApiClient from "../../clients/useGetApiClient";

const NeighbourhoodPriceSection: React.FC = () => {
  const [geoData, setGeoData] = useState<FeatureCollection | undefined>(
    undefined,
  );
  const { data, loading, error } = useGetApiClient<ApiNeighbourhoodPrices>(
    "/get-price-per-neighbourhood",
  );
  useEffect(() => {
    fetch("/maps/Iasi.geojson")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.log(`Error occurred when fetching: ${err}`));
  }, []);
  if (!geoData || !data || loading) return <LoadingSpinner />;
  return <NeighbourhoodsMap geoData={geoData} pricesData={data} />;
};

export default NeighbourhoodPriceSection;
