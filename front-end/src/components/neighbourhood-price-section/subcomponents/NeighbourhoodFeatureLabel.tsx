import { Feature } from "geojson";
import { ApiNeighbourhoodPrices } from "../../../models/Api/ApiNeighbourhoodPrices";
import React from "react";
import { LatLngBoundsExpression } from "leaflet";
import { getApiDataForGeoId } from "../../../mappers/neighbourhoodIdMappings";
import { SVGOverlay } from "react-leaflet";
import styled from "@emotion/styled";
import font from "../../../theme/font";

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

interface FeatureLabelProps {
  feature: Feature;
  pricesData: ApiNeighbourhoodPrices;
}
const FeatureLabel: React.FC<FeatureLabelProps> = ({ feature, pricesData }) => {
  if (!feature.properties) return null;

  const [x, y] = [feature.properties.label_x, feature.properties.label_y];
  const labelSize = 0.1;
  const bounds: LatLngBoundsExpression = [
    [x + labelSize, y + labelSize],
    [x - labelSize, y - labelSize],
  ];

  const priceData = getApiDataForGeoId(feature.properties.NameId, pricesData);
  if (!priceData) return null;

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
};

export default FeatureLabel;
