import express from "express";
import getPricePerNeighbourhoodService from "./services/get-price-per-neighbourhood/getPricePerNeighbourhood";
import updateDbPricesService from "./services/update-db-prices/updateDbPrices";
import { startUpdateDbPricesJob } from "./cron-jobs/updateDbPricesJob";
import { sendTestMail } from "./emails/test-mailer";
import subscribeToNotificationsService from "./services/subscribe-to-notifications/subscribeToNotificationsService";
import cors from "cors";
import getHistoricPricesService from "./services/get-historic-prices/getHistoricPricesService";
import updateHistoricDbPricesService from "./services/update-historic-prices/updateHistoricDbPricesService";
import { startUpdateDbHistoricPricesJob } from "./cron-jobs/updateDbHistoricPricesJob";

const app = express();
app.use(express.json());
app.use(cors());

startUpdateDbPricesJob();
startUpdateDbHistoricPricesJob();

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the Iasi Real Estate Api");
});
app.get("/api/healthcheck", (_req, res) => {
  console.log("Api Check!");
  console.log("IP Address: ", _req.ip);
  console.log("Headers: ", _req.headers);
  res.status(200).send("Api is healthy!");
});
app.get("/api/get-price-per-neighbourhood", getPricePerNeighbourhoodService);

app.get("/api/get-historic-prices", getHistoricPricesService);

app.post("/api/subscribe-to-notifications", subscribeToNotificationsService);

app.get("/email/test", sendTestMail);

app.get("/db/update-prices", updateDbPricesService);

app.get("/db/update-historic-prices", updateHistoricDbPricesService);

app.listen(Number(process.env.PORT), process.env.HOST ?? "5000", () => {
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}!`);
});
