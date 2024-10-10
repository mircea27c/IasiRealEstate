import React, { useEffect, useRef } from "react";
import { Theme, useTheme } from "@emotion/react";
import sizes from "../../../theme/sizes";
import { ApiNeighbourhoodPrices } from "../../../models/Api/ApiNeighbourhoodPrices";
import { useMap } from "react-leaflet";
import L, { Marker } from "leaflet";
import {
  getApiDataForGeoId,
  getIdDataForGeoId,
} from "../../../mappers/neighbourhoodIdMappings";
import { renderToString } from "react-dom/server";
import { TooltipInfo } from "./NeighbourhoodsMap";

interface TooltipComponentProps {
  theme: Theme;
  neighbourhood: string;
  price: number;
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({
  theme,
  neighbourhood,
  price,
}) => (
  <div
    style={{
      width: "fit-content",
      minWidth: 160,
      height: 80,
      backgroundColor: theme.colours.foreground,
      borderRadius: sizes.size8,
      padding: sizes.size8,
      boxSizing: "border-box",
      boxShadow: `0 0 ${sizes.size4} ${theme.colours.black}`,
      whiteSpace: "nowrap",
      color: theme.colours.tertiary,
    }}
  >
    <div
      style={{
        fontSize: sizes.size16,
        fontWeight: 600,
        borderBottom: `${sizes.size1} solid ${theme.colours.tertiary}`,
        width: "fit-content",
        minWidth: "50%",
      }}
    >
      {neighbourhood}
    </div>
    <div>
      <tspan
        style={{
          fontSize: sizes.size24,
          fontWeight: 300,
        }}
      >
        {price}
      </tspan>
      <tspan
        style={{
          fontSize: sizes.size16,
          fontWeight: 700,
        }}
      >
        {" "}
        €/m²
      </tspan>
    </div>
  </div>
);

interface TooltipProps {
  tooltipInfo: TooltipInfo;
  priceData: ApiNeighbourhoodPrices;
}
const Tooltip: React.FC<TooltipProps> = ({ tooltipInfo, priceData }) => {
  const map = useMap();
  const theme = useTheme();
  const tooltipRef = useRef<Marker | null>(null); // Ref to store marker instance

  const neighbourhood = getIdDataForGeoId(
    tooltipInfo.feature.properties.NameId,
  )?.displayName;
  const price = getApiDataForGeoId(
    tooltipInfo.feature.properties.NameId,
    priceData,
  )?.amount;

  useEffect(() => {
    const tooltipIcon = L.divIcon({
      className: "custom-tooltip",
      html: renderToString(
        <TooltipComponent
          theme={theme}
          neighbourhood={neighbourhood ?? "Eroare gasire cartier"}
          price={price ?? 0}
        />,
      ),
      iconSize: [160, 80],
      iconAnchor: [0, 90],
    });

    tooltipRef.current = L.marker(tooltipInfo.position, {
      icon: tooltipIcon,
    }).addTo(map);

    return () => {
      if (tooltipRef.current) {
        map.removeLayer(tooltipRef.current);
      }
    };
  }, [map, tooltipInfo.position]);
  return null;
};

export default Tooltip;
