import { getApiDataForGeoId } from "../../../mappers/neighbourhoodIdMappings";
import React from "react";
import { ApiNeighbourhoodPrices } from "../../../models/Api/ApiNeighbourhoodPrices";
import { FeatureCollection } from "geojson";
import { GeoJSON, MapContainer, SVGOverlay, TileLayer } from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import styled from "@emotion/styled";
import font from "../../../theme/font";
import { useTheme } from "@emotion/react";

const LabelMeasureUnitTspan = styled.tspan`
  ${font.sizes.small}
  font-weight: 500;
  text-anchor: middle;

  fill: white;
  text-shadow: 0 0 3px black;
`;
const LabelPriceTspan = styled.tspan`
  ${font.sizes.medium}
  font-weight: 500;
  text-anchor: middle;

  fill: white;
  text-shadow: 0 0 5px black;
`;

const getColourFromPrice = (price: number, min: number, max: number) => {
  const clampedValue = Math.min(Math.max(price, min), max);
  const percentage = (clampedValue - min) / (max - min);

  const red = 255;
  const green = Math.round(255 * (1 - percentage));
  const blue = 0;

  return `rgb(${red}, ${green}, ${blue})`;
};

interface NeighbourhoodsMapProps {
  geoData: FeatureCollection;
  pricesData: ApiNeighbourhoodPrices;
}
const NeighbourhoodsMap: React.FC<NeighbourhoodsMapProps> = ({
  geoData,
  pricesData,
}) => {
  const startingScale = 13;
  const theme = useTheme();

  const [x, y] = [47.145, 27.6];
  const xBound = 0.1;
  const yBound = 0.3;
  const bounds: LatLngBoundsExpression = [
    [x + xBound, y + yBound],
    [x - xBound, y - yBound],
  ];

  return (
    <MapContainer
      center={[47.145, 27.6]}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      zoom={startingScale}
      minZoom={12}
      maxZoom={15}
      style={{
        flexGrow: 1,
        width: "100%",
      }}
    >
      <TileLayer
        zIndex={1}
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
      />
      {geoData && (
        <GeoJSON
          data={geoData}
          style={(feature: any) => {
            const priceData = getApiDataForGeoId(
              feature.properties.NameId,
              pricesData,
            );
            return {
              fillColor: getColourFromPrice(priceData?.amount ?? 0, 700, 2700),
              weight: 2,
              opacity: 1,
              color: theme.colours.black,
              fillOpacity: 0.6,
            };
          }}
        />
      )}
      {geoData.features.map((item) => {
        if (!item.properties) return;

        const [x, y] = [item.properties.label_x, item.properties.label_y];
        const labelSize = 0.1;
        const bounds: LatLngBoundsExpression = [
          [x + labelSize, y + labelSize],
          [x - labelSize, y - labelSize],
        ];

        const priceData = getApiDataForGeoId(
          item.properties.NameId,
          pricesData,
        );
        if (!priceData) return;

        return (
          <SVGOverlay bounds={bounds}>
            <g>
              <text x={"50%"} y={"50%"}>
                <LabelPriceTspan>{priceData.amount}€</LabelPriceTspan>
                <LabelMeasureUnitTspan>/m²</LabelMeasureUnitTspan>
              </text>
            </g>
          </SVGOverlay>
        );
      })}
    </MapContainer>
  );
};

export default NeighbourhoodsMap;
