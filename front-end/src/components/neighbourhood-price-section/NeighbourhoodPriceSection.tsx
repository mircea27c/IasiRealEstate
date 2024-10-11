import React, { useEffect, useState } from "react";
import { ApiNeighbourhoodPrices } from "../../models/Api/ApiNeighbourhoodPrices";
import { FeatureCollection } from "geojson";
import NeighbourhoodsMap from "./subcomponents/NeighbourhoodsMap";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

const NeighbourhoodPriceSection: React.FC = () => {
  const [geoData, setGeoData] = useState<FeatureCollection | undefined>(
    undefined,
  );
  const [pricesData, setPricesData] = useState<
    ApiNeighbourhoodPrices | undefined
  >(undefined);

  useEffect(() => {
    fetch("/maps/Iasi.geojson")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.log(`Error occurred when fetching: ${err}`));

    const apiUrl = process.env.REACT_APP_API_URL;

    console.log("url:" + apiUrl); // This should log "http://localhost:5000"

    fetch(`${process.env.REACT_APP_API_URL}/api/get-price-per-neighbourhood`)
      .then((response) => response.json())
      .then((data) => setPricesData(data))
      .catch((err) => console.log(`Error occurred when fetching: ${err}`));
  }, []);
  if (!geoData || !pricesData) return <LoadingSpinner />;
  return <NeighbourhoodsMap geoData={geoData} pricesData={pricesData} />;
};

export default NeighbourhoodPriceSection;
