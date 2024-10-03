import axios from "axios";
import { load } from "cheerio";

const scrape = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return load(data);
  } catch (err) {
    console.error(`Error scraping url! ${err}`);
    return undefined;
  }
};

export default scrape;
