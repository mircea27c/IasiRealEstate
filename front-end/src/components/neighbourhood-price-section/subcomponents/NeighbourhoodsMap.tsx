import { getApiDataForGeoId } from "../../../mappers/neighbourhoodIdMappings";
import React, { useState } from "react";
import { ApiNeighbourhoodPrices } from "../../../models/Api/ApiNeighbourhoodPrices";
import { FeatureCollection } from "geojson";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import NeighbourhoodFeatureLabel from "./NeighbourhoodFeatureLabel";
import sizes from "../../../theme/sizes";
import NeighbourhoodTooltip from "./NeighbourhoodTooltip";

export interface TooltipInfo {
  feature: any;
  position: [number, number];
}

const getColourFromPrice = (price: number, min: number, max: number) => {
  const clampedValue = Math.min(Math.max(price, min), max);
  const percentage = (clampedValue - min) / (max - min);

  const red = 255;
  const green = Math.round(255 * (1 - percentage));
  const blue = 0;

  return `rgb(${red}, ${green}, ${blue})`;
};

const getFeatureStyle = (price: number, isSelected: boolean) => ({
  fillColor: getColourFromPrice(price, 1000, 2000),
  weight: 2,
  opacity: 1,
  color: "black",
  fillOpacity: isSelected ? 0.9 : 0.6,
});

const getFeatureBehaviour =
  (
    pricesData: ApiNeighbourhoodPrices,
    setSelectedFeature: (feature: TooltipInfo | null) => void,
  ) =>
  (feature: any, layer: any) => {
    if (!feature.properties) return;

    const price = getApiDataForGeoId(
      feature.properties.NameId,
      pricesData,
    )?.amount;
    if (!price) return;

    layer.setStyle(getFeatureStyle(price, false));

    layer.on({
      mousemove: (e: any) => {
        setSelectedFeature({
          feature: feature,
          position: [e.latlng.lat, e.latlng.lng],
        });
      },
      mouseover: () => {
        layer.setStyle(getFeatureStyle(price, true));
      },
      mouseout: () => {
        layer.setStyle(getFeatureStyle(price, false));
        setSelectedFeature(null);
      },
    });
  };

interface NeighbourhoodsMapProps {
  geoData: FeatureCollection;
  pricesData: ApiNeighbourhoodPrices;
}
const NeighbourhoodsMap: React.FC<NeighbourhoodsMapProps> = ({
  geoData,
  pricesData,
}) => {
  const START_ZOOM = 13;
  const MAX_ZOOM = 15;
  const MIN_ZOOM = 12;

  const [x, y] = [47.15, 27.6];
  const xSize = 0.1;
  const ySize = 0.28;

  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);

  return (
    <MapContainer
      center={[x, y]}
      maxBounds={[
        [x + xSize, y + ySize],
        [x - xSize, y - ySize],
      ]}
      maxBoundsViscosity={1.0}
      zoom={START_ZOOM}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      style={{
        borderRadius: sizes.size12,
        flexGrow: 1,
        width: "100%",
      }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
      />
      {geoData && (
        <GeoJSON
          data={geoData}
          onEachFeature={getFeatureBehaviour(
            pricesData,
            (info: TooltipInfo | null) => setTooltipInfo(info),
          )}
        />
      )}
      {geoData.features.map((item) => (
        <NeighbourhoodFeatureLabel feature={item} pricesData={pricesData} />
      ))}
      {tooltipInfo && (
        <NeighbourhoodTooltip
          tooltipInfo={tooltipInfo}
          priceData={pricesData}
        />
      )}
    </MapContainer>
  );
};

export default NeighbourhoodsMap;
