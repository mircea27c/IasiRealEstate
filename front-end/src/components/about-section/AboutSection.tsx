import React from "react";
import styled from "@emotion/styled";
import sizes from "../../theme/sizes";
import AboutText from "./subcomponents/AboutText";
import AboutGraphic from "../../resources/graphics/about-graphic.png";

const AboutSectionContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  padding: ${sizes.size48} ${sizes.size64};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const InfoColumn = styled.div`
  flex-basis: 60%;
  align-self: stretch;
  gap: ${sizes.size32};
`;
const GraphicColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 40%;
`;

const AboutSection: React.FC = () => {
  return (
    <AboutSectionContainer>
      <InfoColumn>
        <AboutText />
      </InfoColumn>
      <GraphicColumn>
        <img width={"100%"} height={"100%"} src={AboutGraphic} />
      </GraphicColumn>
    </AboutSectionContainer>
  );
};

export default AboutSection;
