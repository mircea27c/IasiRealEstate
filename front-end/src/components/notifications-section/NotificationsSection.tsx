import React from "react";
import NotificationsForm from "./subcomponents/NotificationsForm";
import NotificationsText from "./subcomponents/NotificationsText";
import styled from "@emotion/styled";
import sizes from "../../theme/sizes";
import NewsletterGraphic from "../../resources/graphics/newsletter-graphic.png";
import { BREAKPOINT_MOBILE } from "../../theme/responsiveSizes";

const NotificationsSectionContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: ${sizes.size48} ${sizes.size64};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINT_MOBILE}) {
    padding: ${sizes.size12};
    flex-direction: column-reverse;
    justify-content: start;
    text-align: center;
  }
`;
const SubscribeColumn = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  gap: ${sizes.size32};
  @media (max-width: ${BREAKPOINT_MOBILE}) {
    align-items: center;
  }
`;
const GraphicColumn = styled.div`
  flex-basis: 33%;
  display: flex;
  justify-content: center;
`;
const Graphic = styled.img`
  width: 100%;
  height: 100%;

  @media (max-width: ${BREAKPOINT_MOBILE}) {
    width: 60%;
  }
`;

const NotificationsSection: React.FC = () => {
  return (
    <NotificationsSectionContainer>
      <SubscribeColumn>
        <NotificationsText />
        <NotificationsForm />
      </SubscribeColumn>
      <GraphicColumn>
        <Graphic src={NewsletterGraphic} />
      </GraphicColumn>
    </NotificationsSectionContainer>
  );
};

export default NotificationsSection;
