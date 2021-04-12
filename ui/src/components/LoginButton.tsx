import React from "react";
import { StyledButton } from "./sharedStyles";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC<{}> = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <StyledButton onClick={() => loginWithRedirect()}>
      Log in to continue
    </StyledButton>
  );
};

export default LoginButton;
