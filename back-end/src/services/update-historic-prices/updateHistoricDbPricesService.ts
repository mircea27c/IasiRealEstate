import db from "../../db/db";
import allNeighbourhoods from "../update-db-prices/allNeighbourhoods";
import {
  getLastUpdateTime,
  updateLastUpdateTime,
} from "../../helpers/dbLastUpdateTime";
import {
  getTimeDifferenceFromNow,
  msToDays,
} from "../../helpers/getTimeDifferenceFromNow";

const logCurrentPriceEntriesToDb = async () =>
  await db.query(
    `
      INSERT INTO prices_history
          (neighbourhood_id, price, timestamp)
      SELECT neighbourhood_id, price, NOW()
      FROM prices;
  `,
  );

const trimHistoricPricesTable = async () => {
  const rowsCount = parseInt(
    (await db.query(`SELECT COUNT(*) FROM prices_history`)).rows[0].count,
  );
  const rowsCountLimit = (allNeighbourhoods.length * 365 * 5) / 2;
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
};

export const updateHistoricDbPrices = async () => {
  const LAST_UPDATE_DB_KEY = "last_historic_update";
  const lastUpdatedTime = await getLastUpdateTime(LAST_UPDATE_DB_KEY);
  if (!lastUpdatedTime) return;
  if (msToDays(getTimeDifferenceFromNow(lastUpdatedTime)) < 2) {
    return;
  }

  await updateLastUpdateTime(LAST_UPDATE_DB_KEY);
  await logCurrentPriceEntriesToDb();
  await trimHistoricPricesTable();

  return "Success!";
};

const updateHistoricDbPricesService = async (_req: any, res: any) => {
  try {
    const result = await updateHistoricDbPrices();
    res.status(200).send(result);
  } catch (err) {
    console.error(`Error updating historic prices ${err}`);
    res.status(400).send({ error: "Error updating historic prices" });
  }
};

export default updateHistoricDbPricesService;
