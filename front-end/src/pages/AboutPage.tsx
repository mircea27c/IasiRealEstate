import React from "react";
import ComponentContainer from "../components/component-container/ComponentContainer";
import AboutSection from "../components/about-section/AboutSection";

const AboutPage: React.FC = () => {
  return (
    <ComponentContainer fullHeight={true}>
      <AboutSection />
    </ComponentContainer>
  );
};

export default AboutPage;
