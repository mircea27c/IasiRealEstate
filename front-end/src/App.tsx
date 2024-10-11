import React from "react";
import "./App.css";
import styled from "@emotion/styled";
import Banner from "./components/banner/Banner";
import font from "./theme/font";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NeighbourhoodPricePage from "./pages/NeighbourhoodPricePage";
import HistoricPricePage from "./pages/HistoricPricePage";
import NotificationsPage from "./pages/NotificationsPage";
import AboutPage from "./pages/AboutPage";
import sizes from "./theme/sizes";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colours.background};
  ${font.family};
`;

const PageContainer = styled.div`
  width: 100%;
  padding: ${sizes.size12} ${sizes.globalLateralPadding};
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: ${sizes.size12};

  flex-grow: 1;

  @media (max-width: 800px) {
    padding: ${sizes.size12};
  }
`;

const App: React.FC = () => {
  return (
    <AppContainer className="App">
      <BrowserRouter>
        <Banner />
        <PageContainer>
          <Routes>
            <Route path={"/"} element={<NeighbourhoodPricePage />} />
            <Route path={"/istoric"} element={<HistoricPricePage />} />
            <Route path={"/notificari"} element={<NotificationsPage />} />
            <Route path={"/despre"} element={<AboutPage />} />
          </Routes>
        </PageContainer>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
