import React from "react";
import AboutGraphic from "../../resources/graphics/error-graphic.png";
import styled from "@emotion/styled";
import { BREAKPOINT_MOBILE } from "../../theme/responsiveSizes";
import font from "../../theme/font";
import sizes from "../../theme/sizes";

const TitleText = styled.span`
  ${font.sizes.header}
  ${font.weights.thick}
`;
const ContentText = styled.span`
  ${font.sizes.large}
  ${font.weights.thick}
`;
const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Graphic = styled.img`
  width: 50%;
  max-width: 300px;
  height: 100%;

  @media (max-width: ${BREAKPOINT_MOBILE}) {
    width: 40%;
  }
`;

const ErrorSectionContainer = styled.div`
  display: flex;
  gap: ${sizes.size48};

  @media (max-width: ${BREAKPOINT_MOBILE}) {
    padding: ${sizes.size12};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const ErrorSection: React.FC = () => {
  return (
    <ErrorSectionContainer>
      <Graphic src={AboutGraphic} />
      <TextColumn>
        <TitleText>Ne pare rau!</TitleText>
        <ContentText>S-a produs o eroare!</ContentText>
      </TextColumn>
    </ErrorSectionContainer>
  );
};

export default ErrorSection;
