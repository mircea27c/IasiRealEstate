import db from "../../db/db";
import { CheerioAPI } from "cheerio";
import allNeighbourhoods, { NeighbourhoodAlias } from "./allNeighbourhoods";
import scrapeNeighbourhoodOLX from "../../scrapers/scrapeNeighbourhoodOLX";
import NeighbourhoodOfferData from "../../models/NeighbourhoodOfferData";
import alertOwnerEmail from "../../emails/alertOwnerEmail";
import getAverage from "../../helpers/getAverage";
import {
  getLastUpdateTime,
  updateLastUpdateTime,
} from "../../helpers/dbLastUpdateTime";
import {
  getTimeDifferenceFromNow,
  msToDays,
  msToHours,
} from "../../helpers/getTimeDifferenceFromNow";
import neighbourhoodOfferData from "../../models/NeighbourhoodOfferData";

let goodDealOffers: NeighbourhoodOfferData[] = [];

const alertOwner = async (goodDeals: neighbourhoodOfferData[]) => {
  try {
    if (goodDealOffers.length < 0) return;

    const LAST_OWNER_UPDATE_DB_KEY = "last_owner_update";
    const lastOwnerUpdateDate = await getLastUpdateTime(
      LAST_OWNER_UPDATE_DB_KEY,
    );
    if (!lastOwnerUpdateDate) return;
    if (msToDays(getTimeDifferenceFromNow(lastOwnerUpdateDate)) < 2) {
      return;
    }

    await updateLastUpdateTime(LAST_OWNER_UPDATE_DB_KEY);
    await alertOwnerEmail(goodDealOffers);
  } catch (err) {
    console.error(`Error alerting owner: ${err}`);
  }
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
        if (pricePerArea < MIN_VALID_PRICE * 1.9) {
          console.log("Good offer");
          const goodOffer = {
            url: titleElement.attr("href") ?? "",
            title: titleElement.text(),
            totalPrice: price,
            pricePerArea: pricePerArea,
            area: area,
          };
          if (!goodDealOffers.some((item) => item.url === goodOffer.url)) {
            goodDealOffers.push(goodOffer);
          }
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
  const PAGES_TO_SCRAP_PER_NEIGHBOURHOOD = 5;
  const prices: number[] = [];

  const scrapeQueries: Promise<void>[] = [];

  for (const alias of neighbourhood.aliases) {
    const uniqueLinks: string[] = [];
    for (
      let pageIndex = 1;
      pageIndex <= PAGES_TO_SCRAP_PER_NEIGHBOURHOOD;
      pageIndex++
    ) {
      scrapeQueries.push(
        scrapeNeighbourhoodOLX(alias, pageIndex).then(($) => {
          if (!$) {
            console.error(`Couldn't scrape for alias ${alias}`);
            return;
          }

          const listings = $("[data-cy='ad-card-title']");
          const listingNameRegex = new RegExp(
            `(?<![a-zA-Z])${neighbourhood}(?![a-zA-Z])`,
            "i",
          );

          const validListings = listings.filter((_: number, item) =>
            listingNameRegex.test($(item).find("a").text()),
          );

          const uniqueListings = validListings.filter((_, item) => {
            const link = $(item).find("a").attr("href");
            if (link && !uniqueLinks.some((item) => item === link)) {
              uniqueLinks.push(link);
              return true;
            } else {
              return false;
            }
          });

          if (!validListings || validListings.length == 0) return;

          console.log(
            `Scraping page ${pageIndex} of ${alias}, found ${validListings.length} results`,
          );

          const price = averagePricePerAreaFromListings($, uniqueListings);
          if (price) {
            prices.push(price);
          }
        }),
      );
    }
  }

  await Promise.allSettled(scrapeQueries);
  return getAverage(prices);
};

const updateDbPriceForNeighbourhood = async (
  neighbourhood: string,
  price: number,
) => {
  const query = `
    INSERT INTO prices (neighbourhood_id, price) 
    VALUES ($1, $2)
    ON CONFLICT (neighbourhood_id)
    DO UPDATE SET price = EXCLUDED.price
    RETURNING *;
  `;

  await db.query(query, [neighbourhood, price]);
};

export const updateDbPrices = async () => {
  const LAST_UPDATE_PRICE_DB_KEY = "last_prices_update";
  const lastUpdatedTime = await getLastUpdateTime(LAST_UPDATE_PRICE_DB_KEY);
  if (!lastUpdatedTime) return;
  if (msToHours(getTimeDifferenceFromNow(lastUpdatedTime)) < 6) {
    return;
  }

  const dbQueries: Promise<void>[] = [];
  goodDealOffers = [];

  console.log("start scraping");
  const scrapeQueries = allNeighbourhoods.map((neighbourhood) => {
    return getNeighbourhoodAveragePrice(neighbourhood).then((price) => {
      if (price > 0) {
        dbQueries.push(updateDbPriceForNeighbourhood(neighbourhood.id, price));
      }
    });
  });

  await Promise.all(scrapeQueries);
  console.log("done scraping");

  alertOwner(goodDealOffers);

  await updateLastUpdateTime(LAST_UPDATE_PRICE_DB_KEY);
  await Promise.all(dbQueries);
};

const updateDbPricesService = async (_req: any, res: any) => {
  await updateDbPrices();

  const result = await db.query(`SELECT * FROM prices`);
  res.json(result.rows);
};

export default updateDbPricesService;
