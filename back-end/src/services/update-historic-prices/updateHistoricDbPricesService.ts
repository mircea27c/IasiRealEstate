import db from "../../db/db";
import allNeighbourhoods from "../get-price-per-neighbourhood/allNeighbourhoods";
import { DB_HISTORIC_INTERVAL_DAYS } from "../../configuration/dbUpdateIntervals";

export const updateHistoricDbPrices = async (timestamp: Date) => {
  const query = `
      INSERT INTO prices_history
          (neighbourhood_id, price, timestamp)
      SELECT neighbourhood_id, price, $1
      FROM prices;
  `;

  await db.query(query, [timestamp.toISOString()]);

  const rowsCount = parseInt(
    (await db.query(`SELECT COUNT(*) FROM prices_history`)).rows[0].count,
  );
  const rowsCountLimit =
    (allNeighbourhoods.length * 365 * 5) / DB_HISTORIC_INTERVAL_DAYS;
  if (rowsCount > rowsCountLimit) {
    await db.query(
      `
      DELETE FROM prices_history
        WHERE id IN (
            SELECT id FROM prices_history
            ORDER BY id ASC
            LIMIT $1
          );
    `,
      [rowsCount - rowsCountLimit],
    );
  }
  return "Success!";
};

const updateHistoricDbPricesService = async (_req: any, res: any) => {
  try {
    const result = await updateHistoricDbPrices(new Date());
    res.status(200).send(result);
  } catch (err) {
    console.error(`Error updating historic prices ${err}`);
    res.status(400).send({ error: "Error updating historic prices" });
  }
};

export default updateHistoricDbPricesService;
