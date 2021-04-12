import LoginButton from "./LoginButton";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
`;

const Home: React.FC<{}> = () => {
  return (
    <Wrapper>
      <LoginButton></LoginButton>
    </Wrapper>
  );
};

export default Home;
