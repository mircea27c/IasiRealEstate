import React from "react";
import sizes from "../../../theme/sizes";
import { useTheme } from "@emotion/react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import styled from "@emotion/styled";
import font from "../../../theme/font";
import { ApiNeighbourhoodPrice } from "../../../models/Api/ApiNeighbourhoodPrices";

const TooltipContainer = styled.div`
  min-width: 180px;
  width: fit-content;
  height: fit-content;
  padding: ${sizes.size12};
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  border-radius: ${sizes.size8};

  background-color: ${({ theme }) => theme.colours.foreground};
  box-shadow: 0 0 ${sizes.size8} ${({ theme }) => theme.colours.shadow};

  color: ${({ theme }) => theme.colours.text};
  white-space: nowrap;
`;

const StyledTitle = styled.div`
  ${font.weights.thick};
  margin-bottom: ${sizes.size8};
  padding-bottom: ${sizes.size4};
  border-bottom: ${sizes.size1} solid ${({ theme }) => theme.colours.text};
`;

const ListElementContainer = styled.div<{ colour: string }>`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  gap: ${sizes.size8};
  align-items: center;

  color: ${({ colour }) => colour};
`;

const StyledPrice = styled.span`
  ${font.weights.thick};
`;
const StyledCurrency = styled.span`
  ${font.sizes.small};
`;
const formatLongDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${formattedDate}`;
};

const HistoricTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  payload,
  active,
}) => {
  const theme = useTheme();

  if (!active || payload === undefined || payload.length === 0) {
    return null;
  }
  const priceColours: { priceData: ApiNeighbourhoodPrice; colour: string }[] =
    payload[0].payload.prices.map(
      (item: ApiNeighbourhoodPrice, index: number) => ({
        priceData: item,
        colour: theme.colours.chart[index],
      }),
    );
  const sortedPrices = priceColours.sort(
    (a, b) => a.priceData.amount - b.priceData.amount,
  );

  return (
    <TooltipContainer>
      <StyledTitle>{formatLongDate(payload[0].payload.timestamp)}</StyledTitle>
      {sortedPrices
        .map((item: any) => {
          return (
            <ListElementContainer
              key={item.priceData.neighbourhood}
              colour={item.colour}
            >
              <span>{item.priceData.neighbourhood}:</span>
              <StyledPrice>
                {item.priceData.amount} <StyledCurrency>€/m²</StyledCurrency>
              </StyledPrice>
            </ListElementContainer>
          );
        })
        .reverse()}
    </TooltipContainer>
  );
};

export default HistoricTooltip;
