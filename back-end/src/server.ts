import express from "express";
import getPricePerNeighbourhoodService from "./services/get-price-per-neighbourhood/getPricePerNeighbourhood";
import updateDbPricesService from "./services/update-db-prices/updateDbPrices";
import { startUpdateDbPricesJob } from "./cron-jobs/updateDbPricesJob";
import { sendTestMail } from "./emails/testMailer";
import subscribeToNotificationsService from "./services/subscribe-to-notifications/subscribeToNotificationsService";
import cors from "cors";
import getHistoricPricesService from "./services/get-historic-prices/getHistoricPricesService";
import updateHistoricDbPricesService from "./services/update-historic-prices/updateHistoricDbPricesService";
import { startUpdateDbHistoricPricesJob } from "./cron-jobs/updateDbHistoricPricesJob";
import emailSubscribersService from "./services/email-subscribers/emailSubscribersService";
import { startEmailSubscribersJob } from "./cron-jobs/emailSubscribersJob";
import unsubscribeFromNotificationsService from "./services/unsubscribe-from-notifications/unsubscribeFromNotificationsService";

const app = express();
app.use(express.json());
app.use(cors());

startUpdateDbPricesJob();
startUpdateDbHistoricPricesJob();
startEmailSubscribersJob();

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the Iasi Real Estate Api");
});
app.get("/api/healthcheck", (_req, res) => {
  res.status(200).send("Api is healthy!");
});
app.get("/api/get-price-per-neighbourhood", getPricePerNeighbourhoodService);

app.get("/api/get-historic-prices", getHistoricPricesService);

app.post("/api/subscribe-to-notifications", subscribeToNotificationsService);

app.get("/api/unsubscribe", unsubscribeFromNotificationsService);

app.get("/email/test", sendTestMail);

app.get("/email/email-subscribers", emailSubscribersService);

app.get("/db/update-prices", updateDbPricesService);

app.get("/db/update-historic-prices", updateHistoricDbPricesService);

app.listen(Number(process.env.PORT), process.env.HOST ?? "5000", () => {
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}!`);
});
