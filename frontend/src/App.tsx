import React from "react";
import "./App.css";
import NeighbourhoodPriceSection from "./components/neighbourhood-price-section/NeighbourhoodPriceSection";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <AppContainer className="App">
      <NeighbourhoodPriceSection />
    </AppContainer>
  );
};

export default App;
