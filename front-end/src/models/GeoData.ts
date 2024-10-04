import { Geometry } from "geojson";

export interface GeoFeature {
  type: "Feature";
  properties: { NameId: string; label_x: number; label_y: number };
  geometry: Geometry;
}
export interface GeoData {
  name: string;
  features: GeoFeature[];
}
