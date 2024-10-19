import React from "react";
import styled from "@emotion/styled";
import font from "../../../theme/font";
import sizes from "../../../theme/sizes";

const StyledSubtitle = styled.div`
  ${font.sizes.title};
  ${font.weights.thick};
  color: ${({ theme }) => theme.colours.primaryDark};
`;
const StyledContent = styled.div`
  ${font.sizes.medium};
  ${font.weights.regular};
  color: ${({ theme }) => theme.colours.primary};
`;
const AboutTextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const StyledEmail = styled.div`
  width: fit-content;
  display: inline-block;
  padding: 0 ${sizes.size4};

  border-radius: ${sizes.size4};
  background-color: ${({ theme }) => theme.colours.background};
  color: ${({ theme }) => theme.colours.secondary};
`;

interface InfoPanelProps {
  title: string;
  children: React.ReactNode;
}
const InfoPanel: React.FC<InfoPanelProps> = ({ title, children }) => {
  return (
    <div>
      <StyledSubtitle>{title}</StyledSubtitle>
      <StyledContent>{children}</StyledContent>
    </div>
  );
};

const AboutText: React.FC = () => {
  return (
    <AboutTextContainer>
      <InfoPanel title={"Despre Iasi Real Estate"}>
        Platforma Iasi Real Estate urmareste preturile apartamentelor din
        fiecare cartier din Iasi.
      </InfoPanel>
      <InfoPanel title={"Sursa preturilor"}>
        Preturile pe fiecare cartier sunt calculate pe baza anunturilor de pe
        OLX.
        <br />
        Preturile sunt actualizate zilnic si stocate in baza de date.
      </InfoPanel>
      <InfoPanel title={"Contact"}>
        Ne puteti contacta oricand la adresa de email{" "}
        <StyledEmail>
          <i>preturi.apartamente.iasi@gmail.com</i>
        </StyledEmail>{" "}
        <br />
        Vom raspunde in cel mai scurt timp!
      </InfoPanel>
    </AboutTextContainer>
  );
};

export default AboutText;
