import React from "react";
import styled from "@emotion/styled";
import logo from "../../resources/icons/logo.png";
import sizes from "../../theme/sizes";
import { responsiveWidthContainer } from "../../theme/responsiveSizes";
import Navbar from "./subcomponents/Navbar";

const BannerContainer = styled.div`
  height: ${sizes.size72};
  width: 100%;

  display: flex;
  justify-content: center;

  color: ${({ theme }) => theme.colours.text};

  background-color: ${({ theme }) => theme.colours.foreground};
`;

const ContentContainer = styled.div`
  ${responsiveWidthContainer};
  box-sizing: border-box;
  padding: ${sizes.size8};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Banner: React.FC = () => {
  return (
    <BannerContainer>
      <ContentContainer>
        <img width={64} height={64} src={logo} />
        <Navbar />
      </ContentContainer>
    </BannerContainer>
  );
};

export default Banner;
