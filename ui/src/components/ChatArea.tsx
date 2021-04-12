import styled, { css } from "styled-components";
import { Chat } from "../types";
import { Loader } from "./sharedStyles";
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from "react";

const StyledChatArea = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  border: 3px;
  background: #111111;
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
`;

const StyledChatMessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const StyledChatForm = styled.form`
  display: flex;
  padding: 10px;
  background: #111111;
  & * {
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 1em;
  }
`;

const StyledChatInput = styled.input`
  flex: 1;
  background: #242c37;
  color: #ffffff;
  font: inherit;
  font-size: 1.2rem;
`;

const StyledBtn = styled.button`
  margin-left: 10px;
  padding: 1.5rem;
  width: 20rem;
  background: var(--secondary-color);
  color: #ffffff;
  border-radius: 6px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
  &:hover {
    background: var(--secondary-color);
  }
`;

const StyledMsg = styled.div<{
  isForUser: boolean;
}>`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  ${(props) =>
    props.isForUser &&
    css`
      flex-direction: row-reverse;
    `}
`;

const StyledMsgImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #424242;
  color: #ffffff;
`;
const StyledMsgBubble = styled.div`
  max-width: 450px;
  padding: 15px;
  border-radius: 15px;
  background: var(--left-msg-bg);
  background-color: var(--chat-from-color);
  * {
    color: #ffffff;
  }
`;

const StyledMsgInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledMsgInfoTime = styled.p`
  font-size: 0.85em;
`;
const StyledMsgInfoName = styled.p`
  margin-right: 10px;
  font-weight: bold;
`;

const StyledMsgText = styled.h3`
  font-size: 1.5rem;
`;

const StyledLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ChatMessage {
  chat: Chat;
}

const ChatMessage: React.FC<ChatMessage> = ({ chat }) => {
  const { user } = useAuth0();

  const isForUser = chat.conversation.fromUser.identity === user.sub;
  const forUser = chat.conversation.fromUser.username;
  const toUser = chat.conversation.toUser.username;

  return (
    <StyledMsg isForUser={isForUser}>
      <StyledMsgImg>
        {isForUser ? forUser.charAt(0) : toUser.charAt(0)}
      </StyledMsgImg>
      <StyledMsgBubble>
        <StyledMsgInfo>
          <StyledMsgInfoName>{isForUser ? forUser : toUser}</StyledMsgInfoName>
          <StyledMsgInfoTime>12:30</StyledMsgInfoTime>
        </StyledMsgInfo>

        <StyledMsgText>{chat.message}</StyledMsgText>
      </StyledMsgBubble>
    </StyledMsg>
  );
};

type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface ChatAreaProps {
  chats: Chat[];
  isLoading: boolean;
  sendMessage: (msg: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  chats,
  isLoading,
  sendMessage,
}) => {
  const msgBoxRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const handleOnInputChange = (e: InputEvent) => {
    setMessage(e.target.value);
  };
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <StyledChatArea>
      <StyledChatMessageArea>
        {chats.map((chat, i) => (
          <ChatMessage key={i} chat={chat} />
        ))}
        <div ref={msgBoxRef} />
      </StyledChatMessageArea>
      {isLoading ? (
        <StyledLoaderContainer>
          <Loader />
        </StyledLoaderContainer>
      ) : (
        <StyledChatForm onSubmit={handleOnSubmit}>
          <StyledChatInput onChange={handleOnInputChange} value={message} />
          <StyledBtn>Send</StyledBtn>
        </StyledChatForm>
      )}
    </StyledChatArea>
  );
};

export default ChatArea;
