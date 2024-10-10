import { TailSpin } from "react-loader-spinner";
import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow:1;
  width: 100";
`;

const LoadingSpinner: React.FC = () => {
  const theme = useTheme();
  return (
    <LoadingContainer>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color={theme.colours.secondary}
        radius="1"
      />
    </LoadingContainer>
  );
};

export default LoadingSpinner;
