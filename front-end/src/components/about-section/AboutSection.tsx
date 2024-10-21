import React from "react";
import styled from "@emotion/styled";
import sizes from "../../theme/sizes";
import AboutText from "./subcomponents/AboutText";
import AboutGraphic from "../../resources/graphics/about-graphic.png";
import { BREAKPOINT_MOBILE } from "../../theme/responsiveSizes";

const AboutSectionContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  padding: ${sizes.size48} ${sizes.size64};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINT_MOBILE}) {
    padding: ${sizes.size12};
    flex-direction: column-reverse;
    justify-content: start;
    text-align: center;
  }
`;
const InfoColumn = styled.div`
  flex-basis: 60%;
  align-self: stretch;
  gap: ${sizes.size32};

  @media (max-width: ${BREAKPOINT_MOBILE}) {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;
const GraphicColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 40%;
`;
const Graphic = styled.img`
  width: 100%;
  height: 100%;

  @media (max-width: ${BREAKPOINT_MOBILE}) {
    width: 40%;
  }
`;

const AboutSection: React.FC = () => {
  return (
    <AboutSectionContainer>
      <InfoColumn>
        <AboutText />
      </InfoColumn>
      <GraphicColumn>
        <Graphic width={"100%"} height={"100%"} src={AboutGraphic} />
      </GraphicColumn>
    </AboutSectionContainer>
  );
};

export default AboutSection;
