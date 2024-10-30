import cron from "node-cron";
import { updateHistoricDbPrices } from "../services/update-historic-prices/updateHistoricDbPricesService";
import { DB_HISTORIC_JOB_INTERVAL } from "../configuration/dbUpdateIntervals";

const updateDbHistoricPrices = async () => {
  try {
    console.log("Updating historic prices...");
    updateHistoricDbPrices();
  } catch (err) {
    console.error(`Error running periodic db update prices job: ${err}`);
  }
};

export const startUpdateDbHistoricPricesJob = () => {
  cron.schedule(DB_HISTORIC_JOB_INTERVAL, updateDbHistoricPrices);
};
