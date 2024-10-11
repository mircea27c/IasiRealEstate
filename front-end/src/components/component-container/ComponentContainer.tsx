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
  justify-content: center;
  ${({ fullHeight }) => fullHeight && "flex-grow:1"};

  overflow: hidden;
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
