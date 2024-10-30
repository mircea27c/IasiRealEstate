import styled from "@emotion/styled";
import sizes from "../../../theme/sizes";
import font from "../../../theme/font";
import { BREAKPOINT_MOBILE } from "../../../theme/responsiveSizes";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import useIsMobile from "../../../theme/useIsMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@emotion/react";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  width: fit-content;
  gap: ${sizes.size96};

  ${font.sizes.medium};
  ${font.weights.thin};

  @media (max-width: ${BREAKPOINT_MOBILE}) {
    gap: ${sizes.size16};
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colours.text};
  &:visited {
    color: ${({ theme }) => theme.colours.text};
  }
`;
const StyledUnderline = styled.div`
  ${({ theme }) => `border-bottom: ${sizes.size2} solid ${theme.colours.text}`};
`;
const OpenHamburgerButton = styled.button`
  background-color: transparent;
  border: none;
  height: 100%;
  aspect-ratio: 1;
`;
const CloseHamburgerButton = styled.button`
  background-color: transparent;
  border: none;
  text-align: right;
`;
const MobileMenuContainer = styled.div<{ isOpened: boolean }>`
  width: 200px;
  height: 100%;
  z-index: 5000;

  position: fixed;
  right: ${({ isOpened }) => (isOpened ? "0" : "-200px")};
  top: 0;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${sizes.size24};
  gap: ${sizes.size32};

  background-color: ${({ theme }) => theme.colours.foreground};
  box-shadow: 0 0 ${sizes.size16} ${({ theme }) => theme.colours.shadow};

  transition: all 0.3s ease-in-out;
`;

interface NavbarLinkProps {
  path: string;
  text: string;
  onClick?: () => void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ path, text, onClick }) => {
  const location = useLocation();
  return (
    <StyledLink onClick={onClick} to={path}>
      {location.pathname === path ? (
        <StyledUnderline>{text}</StyledUnderline>
      ) : (
        <> {text}</>
      )}
    </StyledLink>
  );
};

const Navbar: React.FC = () => {
  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

  const isMobile = useIsMobile();
  const theme = useTheme();

  const closeHamburgerOnClick = () =>
    isMobile ? setIsHamburgerOpened(false) : undefined;

  const navbarLinks = [
    <NavbarLink
      onClick={closeHamburgerOnClick}
      key={"cartiere"}
      path={"/"}
      text={"Cartiere"}
    />,
    <NavbarLink
      onClick={closeHamburgerOnClick}
      key={"istoric"}
      path={"/istoric"}
      text={"Istoric"}
    />,
    <NavbarLink
      onClick={closeHamburgerOnClick}
      key={"notificari"}
      path={"/notificari"}
      text={"Notificari"}
    />,
    <NavbarLink
      onClick={closeHamburgerOnClick}
      key={"despre"}
      path={"/despre"}
      text={"Despre"}
    />,
  ];
  if (isMobile) {
    return (
      <>
        <OpenHamburgerButton onClick={() => setIsHamburgerOpened(true)}>
          <FontAwesomeIcon
            fontSize={30}
            color={theme.colours.primary}
            icon={faBars}
          />
        </OpenHamburgerButton>
        {isMobile && (
          <MobileMenuContainer isOpened={isHamburgerOpened}>
            <CloseHamburgerButton onClick={() => setIsHamburgerOpened(false)}>
              <FontAwesomeIcon
                fontSize={30}
                color={theme.colours.primary}
                icon={faX}
              />
            </CloseHamburgerButton>
            {navbarLinks}
          </MobileMenuContainer>
        )}
      </>
    );
  }
  return <NavbarContainer>{navbarLinks}</NavbarContainer>;
};

export default Navbar;
