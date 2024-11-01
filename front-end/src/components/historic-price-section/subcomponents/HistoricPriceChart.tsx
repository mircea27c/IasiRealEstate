import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import HistoricTooltip from "./HistoricTooltip";
import { useTheme } from "@emotion/react";
import { ApiHistoricPrice } from "../../../models/Api/ApiHistoricPrices";
import useIsMobile from "../../../theme/useIsMobile";

const getFormattedDate = (dataObject: ApiHistoricPrice) => {
  const date = new Date(dataObject.timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};

interface HistoricPriceChartProps {
  data: ApiHistoricPrice[];
}
const HistoricPriceChart: React.FC<HistoricPriceChartProps> = ({ data }) => {
  const theme = useTheme();
  let minPrice = data[0].prices[0].amount;
  let maxPrice = data[0].prices[0].amount;
  data.forEach((item) =>
    item.prices.forEach((priceData) => {
      if (priceData.amount < minPrice) minPrice = priceData.amount;
      if (priceData.amount > maxPrice) maxPrice = priceData.amount;
    }),
  );

  const sortedData: ApiHistoricPrice[] = data.map((item: ApiHistoricPrice) => ({
    ...item,
    prices: item.prices.sort((a, b) =>
      a.neighbourhood > b.neighbourhood ? 1 : -1,
    ),
  }));

  minPrice = Math.floor(minPrice / 100) * 100;
  maxPrice = Math.ceil(maxPrice / 100) * 100;

  const isMobile = useIsMobile();
  const DESKTOP_ASPECT = 2;
  return (
    <ResponsiveContainer
      width={isMobile ? "100%" : "90%"}
      aspect={!isMobile ? DESKTOP_ASPECT : undefined}
      height={isMobile ? 500 : undefined}
    >
      <LineChart
        data={sortedData}
        margin={{ right: 32 }}
        onMouseMove={() => {}}
      >
        <XAxis dataKey={getFormattedDate} />
        <YAxis type="number" domain={[minPrice - 100, maxPrice + 100]} />
        <Tooltip position={{ y: 0 }} content={<HistoricTooltip />} />
        {sortedData[0].prices.map((item, index) => (
          <Line
            key={item.neighbourhood}
            type="natural"
            dataKey={`prices[${index}].amount`}
            stroke={theme.colours.chart[index]}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoricPriceChart;
