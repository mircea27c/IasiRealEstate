import React from "react";
import styled from "@emotion/styled";
import sizes from "../../theme/sizes";

const StyledContainer = styled.div<{ fullHeight: boolean }>`
  padding: ${sizes.size8};
  background-color: ${({ theme }) => theme.colours.foreground};
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ fullHeight }) => fullHeight && "flex-grow:1"};

  overflow: hidden;
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
