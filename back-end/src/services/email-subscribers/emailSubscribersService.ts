import db from "../../db/db";
import NeighbourhoodPriceChange from "../../models/NeighbourhoodPriceChange";
import { updateSubscribersEmail } from "../../emails/update-subscribers-email/updateSubscribersEmail";
import {
  getTimeDifferenceFromNow,
  msToDays,
} from "../../helpers/getTimeDifferenceFromNow";
import {
  getLastUpdateTime,
  updateLastUpdateTime,
} from "../../helpers/dbLastUpdateTime";

const getPricesDifferenceFromLastUpdate = async (
  resultsCount: number,
  lastUpdatedTime: Date,
): Promise<NeighbourhoodPriceChange[]> => {
  const sortedPriceDifferences = await db.query(
    `
         WITH old_prices AS (
             SELECT DISTINCT ON (neighbourhood_id) *
             FROM prices_history
             WHERE timestamp <= $1
             ORDER BY neighbourhood_id, timestamp DESC
         )
        SELECT * FROM (SELECT p.neighbourhood_id,
                              p.price  AS current_price,
                              op.price AS previous_price,
                              ROUND(((p.price - op.price) / op.price::FLOAT * 100.0)::NUMERIC,
                                    2) AS percentage_difference
                       FROM old_prices op
                                JOIN prices p ON op.neighbourhood_id = p.neighbourhood_id) AS results
        ORDER BY ABS(percentage_difference) DESC
        LIMIT $2;
    `,
    [lastUpdatedTime, resultsCount],
  );
  return sortedPriceDifferences.rows.map((item) => ({
    neighbourhood: item.neighbourhood_id,
    price: item.current_price,
    change: item.percentage_difference,
  }));
};
const getEmailingList = async () => {
  const result = await db.query(`SELECT email FROM emailing_list`);
  return result.rows.map((row) => row.email);
};

export const emailSubscribers = async () => {
  const LAST_UPDATE_DB_KEY = "last_subscribers_email";

  const lastUpdatedTime = await getLastUpdateTime(LAST_UPDATE_DB_KEY);
  if (!lastUpdatedTime) return;
  if (msToDays(getTimeDifferenceFromNow(lastUpdatedTime)) < 7) {
    return;
  }

  const resultsCount = 5;
  const priceChanges = await getPricesDifferenceFromLastUpdate(
    resultsCount,
    lastUpdatedTime,
  );
  const emailingList = await getEmailingList();

  await updateLastUpdateTime(LAST_UPDATE_DB_KEY);
  await updateSubscribersEmail(emailingList, priceChanges);
};

const emailSubscribersService = async (_req: any, res: any) => {
  try {
    await emailSubscribers();
    res.status(200).send("Emailed subscribers!");
  } catch (err) {
    console.error(`Error emailing subscribers ${err}`);
    res.status(400).send({ error: err });
  }
};

export default emailSubscribersService;
