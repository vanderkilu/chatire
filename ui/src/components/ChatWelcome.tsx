import styled from "styled-components";
import chatImg from "../assets/chat.svg";

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  border: 3px;
  background: #111111;
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
  background-color: #111111;
`;

const StyledImage = styled.img`
  width: 20rem;
  height: 20rem;
  margin-bottom: 5rem;
`;
const StyledWelcomeText = styled.h3`
  color: #ffffff;
  font-size: 20px;
`;

const ChatWelcome: React.FC<{}> = () => {
  return (
    <StyledWrapper>
      <StyledImage src={chatImg} alt="chat image" />
      <StyledWelcomeText>
        Welcome to ChatApp, click on a user to initiate a conversation.
      </StyledWelcomeText>
    </StyledWrapper>
  );
};

export default ChatWelcome;
