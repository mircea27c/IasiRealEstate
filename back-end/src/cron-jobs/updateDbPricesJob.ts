import cron from "node-cron";
import { updateDbPrices } from "../services/update-db-prices/updateDbPrices";
import { DB_PRICES_INTERVAL_HOURS } from "../configuration/dbUpdateIntervals";

const updateDbPricesJob = async () => {
  try {
    console.log("Updating historic prices...");
    updateDbPrices();
  } catch (err) {
    console.log(`Error running periodic db update prices job: ${err}`);
  }
};

export const startUpdateDbPricesJob = () => {
  cron.schedule(`0 */${DB_PRICES_INTERVAL_HOURS} * * *`, updateDbPricesJob);
};
