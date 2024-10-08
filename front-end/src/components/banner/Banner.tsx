import React from "react";
import styled from "@emotion/styled";
import logo from "../../resources/icons/temp-logo.png";
import sizes from "../../theme/sizes";
import font from "../../theme/font";
import { Link, useLocation } from "react-router-dom";

const BannerContainer = styled.div`
  height: ${sizes.size72};
  width: 100%;
  padding: 0 ${sizes.size96};
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;

  align-items: center;
  color: ${({ theme }) => theme.colours.secondary};

  background-color: ${({ theme }) => theme.colours.foreground};
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  width: fit-content;
  gap: ${sizes.size96};

  ${font.sizes.medium}
  ${font.weights.thin}
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;

  border-bottom: ${({ isActive, theme }) =>
    isActive ? `${sizes.size2} solid ${theme.colours.secondary}` : "none"};

  &:visited {
    color: ${({ theme }) => theme.colours.secondary};
  }
`;

interface NavbarLinkProps {
  path: string;
  text: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ path, text }) => {
  const location = useLocation();
  return (
    <StyledLink isActive={location.pathname === path} to={path}>
      {text}
    </StyledLink>
  );
};

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <NavbarLink path={"/"} text={"Cartiere"} />
      <NavbarLink path={"/istoric"} text={"Istoric"} />
      <NavbarLink path={"/notificari"} text={"Notificari"} />
      <NavbarLink path={"/despre"} text={"Despre"} />
    </NavbarContainer>
  );
};

const Banner: React.FC = () => {
  return (
    <BannerContainer>
      <img width={64} height={64} src={logo} />
      <Navbar />
    </BannerContainer>
  );
};

export default Banner;
