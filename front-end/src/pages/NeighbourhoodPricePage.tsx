import React from "react";
import NeighbourhoodPriceSection from "../components/neighbourhood-price-section/NeighbourhoodPriceSection";
import ComponentContainer from "../components/component-container/ComponentContainer";

const NeighbourhoodPricePage: React.FC = () => {
  return (
    <ComponentContainer fullHeight={true}>
      <NeighbourhoodPriceSection />
    </ComponentContainer>
  );
};

export default NeighbourhoodPricePage;
