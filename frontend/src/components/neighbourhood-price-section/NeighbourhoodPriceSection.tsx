import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { GeoData } from "../../models/GeoData";
import { ApiNeighbourhoodPrices } from "../../models/Api/ApiNeighbourhoodPrices";
import SatelliteMap from "./subcomponents/SatelliteMap";
import NeighbourhoodsMap from "./subcomponents/NeighbourhoodsMap";

const NeighbourhoodPriceSectionWrapper = styled.div`
  width: 1000px;
  height: 1000px;
  position: relative;
`;

const NeighbourhoodPriceSection: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoData | undefined>(undefined);
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
  const [centerX, centerY] = [27.6, 47.145];
  if (!geoData || !pricesData) return <div>Loading...</div>;

  return (
    <NeighbourhoodPriceSectionWrapper>
      <SatelliteMap zoom={13} center={[centerY, centerX]} />
      <NeighbourhoodsMap
        geoData={geoData}
        pricesData={pricesData}
        center={[centerX, centerY]}
      />
    </NeighbourhoodPriceSectionWrapper>
  );
};

export default NeighbourhoodPriceSection;
