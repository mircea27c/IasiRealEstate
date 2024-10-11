import PricePerNeighbourhoodResponse from "../../models/PricePerNeighbourhoodResponse";
import db from "../../db/db";

const getPricePerNeighbourhoodFromDb: () => Promise<PricePerNeighbourhoodResponse> =
  async () => {
    const result = await db.query("SELECT * FROM prices");
    return {
      prices: result.rows.map((item) => ({
        neighbourhood: item.neighbourhood_id,
        amount: item.price,
      })),
    };
  };

const getPricePerNeighbourhoodService = async (_req: any, res: any) => {
  try {
    const response = await getPricePerNeighbourhoodFromDb();
    res.send(response).status(200);
  } catch (err) {
    console.error(
      `There's been an error in getting price per neighbourhood: ${err}`,
    );
    res.status(400).send({
      error: `There's been an error in getting price per neighbourhood: ${err}`,
    });
  }
};

export default getPricePerNeighbourhoodService;
