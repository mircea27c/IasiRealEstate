import express from "express";
import getPricePerNeighbourhoodService from "./services/get-price-per-neighbourhood/getPricePerNeighbourhood";
import updateDbPricesService from "./services/update-db-prices/updateDbPrices";
import { startUpdateDbPricesJob } from "./cron-jobs/updateDbPricesJob";
import { sendTestMail } from "./emails/test-mailer";
import subscribeToNotificationsService from "./services/subscribe-to-notifications/subscribeToNotificationsService";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

startUpdateDbPricesJob();

app.get("/api/healthcheck", (_req, res) => {
  res.status(200).send("Api is healthy!");
});
app.get("/api/get-price-per-neighbourhood", getPricePerNeighbourhoodService);

app.post("/api/subscribe-to-notifications", subscribeToNotificationsService);

app.get("/email/test", sendTestMail);

app.get("/db/update-prices", updateDbPricesService);

app.listen(Number(process.env.PORT), process.env.HOST ?? "5000", () => {
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}!`);
});
