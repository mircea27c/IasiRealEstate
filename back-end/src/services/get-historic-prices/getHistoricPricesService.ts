import db from "../../db/db";
import HistoricPricesResponse from "../../models/HistoricPricesResponse";
import { NeighbourhoodPriceData } from "../../models/PricePerNeighbourhoodResponse";

const getHistoricPricesService = async (req: any, res: any) => {
  try {
    const startDate: Date = new Date(req.query.startDate);
    const endDate: Date = new Date(req.query.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid Start or End Date");
    }

    const query = `
        SELECT *
        FROM prices_history
        WHERE "timestamp" >= $1
          AND "timestamp" <= $2;
    `;

    const result = await db.query(query, [
      startDate.toISOString(),
      endDate.toISOString(),
    ]);
    const resultGroupedByTimestamp: {
      [key: string]: NeighbourhoodPriceData[];
    } = {};
    result.rows.forEach((row) => {
      const formattedTimestamp = new Date(row.timestamp).toISOString();

      resultGroupedByTimestamp[formattedTimestamp] =
        resultGroupedByTimestamp[formattedTimestamp] ?? [];
      resultGroupedByTimestamp[formattedTimestamp].push({
        neighbourhood: row.neighbourhood_id,
        amount: row.price,
      });
    });

    const response: HistoricPricesResponse = {
      historicPrices: Object.entries(resultGroupedByTimestamp).map(
        ([key, value]) => ({
          timestamp: key,
          prices: value,
        }),
      ),
    };

    res.status(200).send(response);
  } catch (err) {
    console.error(`Error getting historic prices: ${err}`);
    res.status(400).send({
      error: `There's been an error in getting historic prices: ${err}`,
    });
  }
};

export default getHistoricPricesService;
