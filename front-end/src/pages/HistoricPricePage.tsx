import React from "react";
import ComponentContainer from "../components/component-container/ComponentContainer";
import HistoricPriceSection from "../components/historic-price-section/HistoricPriceSection";

const HistoricPricePage: React.FC = () => {
  return (
    <ComponentContainer fullHeight={true}>
      <HistoricPriceSection />
    </ComponentContainer>
  );
};

export default HistoricPricePage;
