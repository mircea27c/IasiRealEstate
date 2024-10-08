import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ApiNeighbourhoodPrices } from "../../models/Api/ApiNeighbourhoodPrices";
import { FeatureCollection, GeoJsonObject } from "geojson";
import NeighbourhoodsMap from "./subcomponents/NeighbourhoodsMap";

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

    fetch("api/get-price-per-neighbourhood")
      .then((response) => response.json())
      .then((data) => setPricesData(data))
      .catch((err) => console.log(`Error occurred when fetching: ${err}`));
  }, []);
  if (!geoData || !pricesData) return <div>Loading...</div>;

  return <NeighbourhoodsMap geoData={geoData} pricesData={pricesData} />;
};

export default NeighbourhoodPriceSection;
