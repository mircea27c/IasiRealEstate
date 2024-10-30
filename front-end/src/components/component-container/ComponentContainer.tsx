import React from "react";
import styled from "@emotion/styled";
import sizes from "../../theme/sizes";
import { responsiveWidthContainer } from "../../theme/responsiveSizes";

const StyledContainer = styled.div<{ fullHeight: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ fullHeight }) => fullHeight && "flex-grow:1"};

  padding: ${sizes.size8};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colours.foreground};
  ${responsiveWidthContainer};

  box-shadow: 0 0 ${sizes.size16} ${({ theme }) => theme.colours.shadow};
  border-radius: ${sizes.size16};
`;

interface ComponentContainerProps {
  children: React.ReactNode;
  fullHeight?: boolean;
}
const ComponentContainer: React.FC<ComponentContainerProps> = ({
  children,
  fullHeight,
}) => (
  <StyledContainer fullHeight={fullHeight ?? false}>{children}</StyledContainer>
);

export default ComponentContainer;
