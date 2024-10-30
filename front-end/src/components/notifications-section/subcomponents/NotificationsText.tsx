import React from "react";
import styled from "@emotion/styled";
import font from "../../../theme/font";

const StyledTitle = styled.div`
  ${font.weights.black};
  ${font.sizes.header};
  color: ${({ theme }) => theme.colours.primaryDark};
`;
const StyledSubtitle = styled.div`
  ${font.weights.thick};
  ${font.sizes.title};
  color: ${({ theme }) => theme.colours.primary};
`;
const HighlightedSubtitle = styled.span`
  ${font.weights.black};
  color: ${({ theme }) => theme.colours.text};
`;

const NotificationsText: React.FC = () => {
  return (
    <div>
      <StyledTitle>Aboneaza-te la newsletter</StyledTitle>
      <StyledSubtitle>
        pentru a fi la curent cu evolutia preturilor pe piata imobiliara a{" "}
        <HighlightedSubtitle>Iasiului</HighlightedSubtitle>
      </StyledSubtitle>
    </div>
  );
};

export default NotificationsText;
