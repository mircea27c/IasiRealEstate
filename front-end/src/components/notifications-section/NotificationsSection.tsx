import React from "react";
import NotificationsForm from "./subcomponents/NotificationsForm";
import NotificationsText from "./subcomponents/NotificationsText";
import styled from "@emotion/styled";
import sizes from "../../theme/sizes";
import NewsletterGraphic from "../../resources/graphics/newsletter-graphic.png";

const NotificationsSectionContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: ${sizes.size48} ${sizes.size64};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SubscribeColumn = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  gap: ${sizes.size32};
`;
const GraphicColumn = styled.div`
  flex-basis: 33%;
`;

const NotificationsSection: React.FC = () => {
  return (
    <NotificationsSectionContainer>
      <SubscribeColumn>
        <NotificationsText />
        <NotificationsForm />
      </SubscribeColumn>
      <GraphicColumn>
        <img width={"100%"} height={"100%"} src={NewsletterGraphic} />
      </GraphicColumn>
    </NotificationsSectionContainer>
  );
};

export default NotificationsSection;
