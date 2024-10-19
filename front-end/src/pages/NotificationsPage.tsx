import React from "react";
import ComponentContainer from "../components/component-container/ComponentContainer";
import NotificationsSection from "../components/notifications-section/NotificationsSection";

const NotificationsPage: React.FC = () => {
  return (
    <ComponentContainer fullHeight={true}>
      <NotificationsSection />
    </ComponentContainer>
  );
};

export default NotificationsPage;
