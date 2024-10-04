import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Position } from "geojson";

interface SatelliteMapProps {
  center: Position;
  zoom: number;
}

const SatelliteMap: React.FC<SatelliteMapProps> = ({ center, zoom }) => (
  <MapContainer
    center={[center[0], center[1]]}
    zoom={zoom}
    style={{ height: "100%", width: "100%", zIndex: 1 }}
    scrollWheelZoom={false}
    dragging={false}
    touchZoom={false}
    doubleClickZoom={false}
    zoomControl={false}
  >
    <TileLayer
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
    />
  </MapContainer>
);

export default SatelliteMap;
