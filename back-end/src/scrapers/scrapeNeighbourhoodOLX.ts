import scrape from "./scraper";

const scrapeNeighbourhoodOLX = async (neighbourhood: string, page: number) => {
  return await scrape(
    `https://www.olx.ro/imobiliare/apartamente-garsoniere-de-vanzare/iasi_39939/q-${neighbourhood.split(" ").join("-")}/?currency=EUR${page ? `&page=${page}` : ""}`,
  );
};

export default scrapeNeighbourhoodOLX;
