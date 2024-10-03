import scrapeNeighbourhoodOLX from "../../scrapers/scrapeNeighbourhoodOLX";
import { CheerioAPI } from "cheerio";
import allNeighbourhoods, { NeighbourhoodAlias } from "./allNeighbourhoods";
import pricePerNeighbourhoodResponse from "../../models/pricePerNeighbourhoodResponse";

const getAverage = (array: number[]) => {
  if (array.length == 0) return 0;
  return Math.round(array.reduce((acc, value) => acc + value) / array.length);
};

const alertGoodDeal = (url: string, title: string, price: string) => {
  console.log(`${price} EURO ${title}`);
  console.log(`${url}`);
};

const averagePricePerAreaFromListings = (
  $: CheerioAPI,
  listings: any,
): number | undefined => {
  const areaUnitOfMeasure = "m²";
  const MIN_VALID_PRICE = 500;
  const MAX_VALID_PRICE = 4000;

  const validPrices: number[] = [];
  listings.each((_: number, item: any) => {
    const apartmentListing = $(item).closest("div").parent();
    const findInListing = (query: string) => {
      const result = apartmentListing.find(query);
      if (result.length == 0) {
        throw new Error(`Couldn't find any elements for the query ${query}`);
      }
      return result;
    };
    const extractNumericValue = (text: string) => {
      const parsedValue = parseInt(text);
      if (isNaN(parsedValue)) {
        throw new Error(`Couldn't parse ${text}`);
      } else {
        return parsedValue;
      }
    };

    try {
      const titleElement = findInListing("a[href]");
      const areaElement = findInListing(`span:contains(${areaUnitOfMeasure})`);
      const priceElement = findInListing("[data-testid='ad-price']");

      if (titleElement.text().includes(".css")) {
        return;
      }

      const priceText = priceElement.text().replace(" ", "").match(/\d+/g);
      if (!priceText) return;

      const price = extractNumericValue(priceText[0]);
      const area = extractNumericValue(
        areaElement.text().replace(areaUnitOfMeasure, ""),
      );

      const pricePerArea = price / area;
      if (pricePerArea > MIN_VALID_PRICE && pricePerArea < MAX_VALID_PRICE) {
        if (pricePerArea < MIN_VALID_PRICE * 2) {
          alertGoodDeal(
            titleElement.attr("href") ?? "",
            titleElement.text(),
            pricePerArea.toString(),
          );
        }
        validPrices.push(pricePerArea);
      }
    } catch (err) {
      return;
    }
  });

  if (validPrices.length == 0) {
    console.warn(`no valid listings for neighbourhood`);
    return;
  }

  return getAverage(validPrices);
};

const getNeighbourhoodAveragePrice = async (
  neighbourhood: NeighbourhoodAlias,
): Promise<number> => {
  const prices = [];
  for (const alias of neighbourhood.aliases) {
    const $ = await scrapeNeighbourhoodOLX(alias, 1);
    if (!$) {
      console.error(`Couldn't scrape for alias ${alias}`);
      continue;
    }

    const listings = $("[data-cy='ad-card-title']");
    const listingNameRegex = new RegExp(
      `(?<![a-zA-Z])${neighbourhood}(?![a-zA-Z])`,
      "i",
    );

    const validListings = listings.filter((_: number, item) =>
      listingNameRegex.test($(item).find("a").text()),
    );

    if (validListings.length == 0) continue;

    const price = averagePricePerAreaFromListings($, validListings);
    if (price) prices.push(price);
  }

  return getAverage(prices);
};

const getPricePerNeighbourhoodService = async (_req: any, res: any) => {
  try {
    const response: pricePerNeighbourhoodResponse = { prices: [] };

    for (const neighbourhood of allNeighbourhoods) {
      const price = await getNeighbourhoodAveragePrice(neighbourhood);
      if (price > 0)
        response.prices.push({
          neighbourhood: neighbourhood.id,
          amount: price,
        });
    }

    res.status(200).send(response);
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
