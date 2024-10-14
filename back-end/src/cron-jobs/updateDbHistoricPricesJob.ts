import cron from "node-cron";
import { updateHistoricDbPrices } from "../services/update-historic-prices/updateHistoricDbPricesService";
import { DB_HISTORIC_INTERVAL_DAYS } from "../configuration/dbUpdateIntervals";

const updateDbHistoricPrices = async () => {
  try {
    console.log("Updating historic prices...");
    updateHistoricDbPrices(new Date());
  } catch (err) {
    console.log(`Error running periodic db update prices job: ${err}`);
  }
};

export const startUpdateDbHistoricPricesJob = () => {
  cron.schedule(
    `0 0 */${DB_HISTORIC_INTERVAL_DAYS} * *`,
    updateDbHistoricPrices,
  );
};
