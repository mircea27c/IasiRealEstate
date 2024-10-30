import React, { useState } from "react";
import styled from "@emotion/styled";
import font from "../../../theme/font";
import sizes from "../../../theme/sizes";

const NotificationsFormContainer = styled.form`
  width: 250px;
  height: fit-content;
`;

const StyledLabel = styled.label`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  text-align: left;
  ${font.weights.thick}
  color: ${({ theme }) => theme.colours.primary};
`;
const StyledInput = styled.input`
  height: ${sizes.size48};
  padding: 0 ${sizes.size12};

  border-radius: ${sizes.size8};
  border: ${sizes.size2} solid ${({ theme }) => theme.colours.primary};
  opacity: 0.5;
  background-color: ${({ theme }) => theme.colours.foreground};

  ${font.sizes.medium};
  ${font.weights.regular};
  ${font.family}

  &:focus {
    opacity: 1;
    outline: none;
  }
`;
const StyledSubmitButton = styled.button`
  height: ${sizes.size48};
  width: 100%;
  border: none;
  margin-top: ${sizes.size8};

  color: ${({ theme }) => theme.colours.foreground};
  ${font.family}
  ${font.weights.thick}
  ${font.sizes.medium}
  border-radius: ${sizes.size8};
  background-color: ${({ theme }) => theme.colours.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colours.primaryDark};
  }
  &:active {
    border: ${sizes.size2} solid ${({ theme }) => theme.colours.primary};
    background-color: transparent;
    color: ${({ theme }) => theme.colours.primary};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colours.shadow};
    color: ${({ theme }) => theme.colours.shadow};
    border: none;
  }
`;
const ErrorContainer = styled.div`
  color: ${({ theme }) => theme.colours.error};
`;
const SuccessContainer = styled.div`
  color: ${({ theme }) => theme.colours.success};
`;

const NotificationsForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);

  const addEmailToDb = async (email: string) => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subscribe-to-notifications`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      },
    );
    const data = await result.json();
    console.log(data);
    setSuccess(data.success);
    if (data.error) {
      console.log(data.error);
      setError(data.userError ?? "S-a produs o eroare!");
    } else {
      setError(null);
    }
    setLoading(false);
  };

  return (
    <NotificationsFormContainer
      onSubmit={(event) => {
        event.preventDefault();
        setLoading(true);
        setSuccess(false);
        addEmailToDb(email);
      }}
    >
      <StyledLabel>
        Email:
        <StyledInput
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {error ? (
          <ErrorContainer> {error} </ErrorContainer>
        ) : (
          success && (
            <SuccessContainer>Te-ai abonat cu succes!</SuccessContainer>
          )
        )}
        <StyledSubmitButton type="submit" disabled={loading}>
          Abonare
        </StyledSubmitButton>
      </StyledLabel>
    </NotificationsFormContainer>
  );
};
export default NotificationsForm;
