import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { StyledButton } from "./sharedStyles";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
`;

const Home: React.FC<{}> = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <StyledButton size="normal" onClick={() => loginWithRedirect()}>
        Log in to continue
      </StyledButton>
    </Wrapper>
  );
};

export default Home;
