import express from "express";
import getPricePerNeighbourhoodService from "./services/get-price-per-neighbourhood/getPricePerNeighbourhood";
import updateDbPricesService from "./services/update-db-prices/updateDbPrices";
import { startUpdateDbPricesJob } from "./cron-jobs/updateDbPricesJob";

const app = express();

const hostname = "localhost";
const port = 5000;

startUpdateDbPricesJob();

app.get("/api/healthcheck", (_req, res) => {
  res.status(200).send("Api is healthy!");
});

app.get("/api/get-price-per-neighbourhood", getPricePerNeighbourhoodService);

app.get("/db/update-prices", updateDbPricesService);

app.listen(port, hostname, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
