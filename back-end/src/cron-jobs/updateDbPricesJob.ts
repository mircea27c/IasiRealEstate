import cron from "node-cron";
import { updateDbPrices } from "../services/update-db-prices/updateDbPrices";

const updateDbPricesJob = async () => {
  try {
    updateDbPrices();
  } catch (err) {
    console.log(`Error running periodic db update prices job: ${err}`);
  }
};

export const startUpdateDbPricesJob = () => {
  cron.schedule("0 */3 * * *", updateDbPricesJob);
};
