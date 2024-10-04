import { ApiNeighbourhoodPrices } from "../models/Api/ApiNeighbourhoodPrices";

export const getIdDataForGeoId = (geoId: string) => {
  return neighbourhoodIdMappings.find((item) => item.geoId === geoId);
};

export const getApiDataForGeoId = (
  geoId: string,
  apiData: ApiNeighbourhoodPrices,
) => {
  const apiId = getIdDataForGeoId(geoId)?.apiId;
  if (!apiId) {
    console.warn(`Couldn't find api data for geoId: ${geoId}`);
    return undefined;
  }
  return apiData.prices.find((item) => item.neighbourhood === apiId);
};

export interface neighbourhoodIdMapping {
  geoId: string;
  apiId: string;
  displayName: string;
}

export const neighbourhoodIdMappings: neighbourhoodIdMapping[] = [
  { geoId: "Pacurari", apiId: "pacurari", displayName: "Pacurari" },
  { geoId: "Copou", apiId: "copou", displayName: "Copou" },
  { geoId: "Centru", apiId: "centru", displayName: "Centru" },
  { geoId: "Canta", apiId: "canta", displayName: "Canta" },
  { geoId: "Dacia", apiId: "dacia", displayName: "Dacia" },
  { geoId: "Alexandru", apiId: "alexandru", displayName: "Alexandru Cel Bun" },
  { geoId: "Mircea", apiId: "mircea", displayName: "Mircea Cel Batran" },
  {
    geoId: "MoaraDeVant",
    apiId: "moara de vant",
    displayName: "Moara De Vant",
  },
  { geoId: "Tatarasi", apiId: "tatarasi", displayName: "Tatarasi" },
  { geoId: "Tudor", apiId: "tudor", displayName: "Tudor" },
  { geoId: "PoduRos", apiId: "podu ros", displayName: "Podu Ros" },
  { geoId: "Ticau", apiId: "ticau", displayName: "Ticau" },
  { geoId: "Agronomie", apiId: "agronomie", displayName: "Agronomie" },
  { geoId: "Gara", apiId: "gara", displayName: "Gara" },
  { geoId: "CUG", apiId: "cug", displayName: "CUG" },
  { geoId: "Frumoasa", apiId: "frumoasa", displayName: "Frumoasa" },
  {
    geoId: "ZonaIndustriala",
    apiId: "zona industriala",
    displayName: "Zona Industriala",
  },
  { geoId: "MantaRosie", apiId: "manta rosie", displayName: "Manta Rosie" },
  { geoId: "Bucium", apiId: "bucium", displayName: "Bucium" },
  { geoId: "Galata", apiId: "galata", displayName: "Galata" },
  { geoId: "Nicolina", apiId: "nicolina", displayName: "Nicolina" },
  { geoId: "Tesatura", apiId: "tesatura", displayName: "Tesatura" },
  { geoId: "Bularga", apiId: "bularga", displayName: "Bularga" },
  { geoId: "Cantemir", apiId: "cantemir", displayName: "Cantemir" },
];
