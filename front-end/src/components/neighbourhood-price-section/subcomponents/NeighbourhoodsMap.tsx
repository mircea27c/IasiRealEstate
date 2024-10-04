import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-map";
import {
  getApiDataForGeoId,
  getIdDataForGeoId,
} from "../../../mappers/neighbourhoodIdMappings";
import React from "react";
import styled from "@emotion/styled";
import { GeoData } from "../../../models/GeoData";
import { ApiNeighbourhoodPrices } from "../../../models/Api/ApiNeighbourhoodPrices";
import { Position } from "geojson";

const LabelMeasureUnitTspan = styled.tspan`
  font-size: 10px;
  font-weight: 500;
  text-anchor: middle;

  fill: white;
  text-shadow: 0 0 3px black;
`;
const LabelPriceTspan = styled.tspan`
  font-size: 15px;
  font-weight: 500;
  text-anchor: middle;

  fill: white;
  text-shadow: 0 0 5px black;
`;

const NeighbourhoodsMapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const getColourFromPrice = (price: number, min: number, max: number) => {
  const clampedValue = Math.min(Math.max(price, min), max);
  const percentage = (clampedValue - min) / (max - min);

  const red = 255;
  const green = Math.round(255 * (1 - percentage));
  const blue = 0;

  return `rgb(${red}, ${green}, ${blue})`;
};

interface NeighbourhoodLabelsProps {
  geoData: GeoData;
  pricesData: ApiNeighbourhoodPrices;
}
const NeighbourhoodLabels: React.FC<NeighbourhoodLabelsProps> = ({
  geoData,
  pricesData,
}) => (
  <>
    {geoData.features.map((item) => {
      const geoId = item.properties.NameId;
      const price = getApiDataForGeoId(geoId, pricesData)?.amount;
      const displayName = getIdDataForGeoId(geoId)?.displayName;

      if (!price || !displayName) return;

      return (
        <Marker
          key={geoId}
          coordinates={[item.properties.label_y, item.properties.label_x]}
        >
          <g transform="translate(0, 3)">
            <text>
              <LabelPriceTspan>{price}€</LabelPriceTspan>
              <LabelMeasureUnitTspan>/m²</LabelMeasureUnitTspan>
            </text>
          </g>
        </Marker>
      );
    })}
  </>
);

interface NeighbourhoodsMapProps {
  geoData: GeoData;
  pricesData: ApiNeighbourhoodPrices;
  center: Position;
}
const NeighbourhoodsMap: React.FC<NeighbourhoodsMapProps> = ({
  geoData,
  pricesData,
  center,
}) => {
  return (
    <NeighbourhoodsMapWrapper>
      <ComposableMap
        projection={"geoMercator"}
        projectionConfig={{ scale: 330000, center: [center[0], center[1]] }}
        width={1000}
        height={1000}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const priceData = getApiDataForGeoId(
                geo.properties.NameId,
                pricesData,
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke={"#212121"}
                  strokeWidth={1.5}
                  fill={getColourFromPrice(priceData?.amount ?? 0, 1000, 2800)}
                  style={{
                    default: {
                      fillOpacity: 0.6,
                      outline: "none",
                    },
                    hover: {
                      fillOpacity: 0.9,
                      outline: "none",
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
        <NeighbourhoodLabels geoData={geoData} pricesData={pricesData} />
      </ComposableMap>
    </NeighbourhoodsMapWrapper>
  );
};

export default NeighbourhoodsMap;
