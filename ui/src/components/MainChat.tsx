import styled from "styled-components";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ChatEvent, User } from "../types";
import ChatWelcome from "./ChatWelcome";

const SOCKET_URL = "http://localhost:8080";
const socket = io(SOCKET_URL, {
  withCredentials: true,
});

const StyledChatContainer = styled.div`
  display: grid;
  grid-template-columns: 30rem 1fr;
  height: 100vh;
  overflow: hidden;
`;

const StyledChatSidebar = styled.div`
  background-color: var(--base-color);
`;

const StyledText = styled.p`
  font-size: 1.4rem;
`;

const StyledSidebarUser = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: var(--tertiary-color);
  padding: 5px;
`;
const StyledSidebarUserPlaceholder = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #424242;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
`;
const StyledSidebarText = styled.p`
  color: #ffffff;
  font-size: 1.4rem;
`;

const StyledChatArea = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  border: 3px;
  background: #111111;
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
`;

const StyledChatHeader = styled.header<{
  mb: number;
}>`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 3px;
  background: #eee;
  color: #666;
  margin-bottom: ${(props) => props.mb}rem;
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

const StyledMsg = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
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

const MainChat: React.FC<{}> = () => {
  const { user } = useAuth0();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  useEffect(() => {
    const USER = { identity: user.sub, username: user.name };
    socket.emit(ChatEvent.NEW_USER, USER);
    socket.on(ChatEvent.NEW_USER, (users: User[]) => {
      setOnlineUsers(users);
    });
    return () => {};
  }, []);

  const getUserInitial = (username: string) => {
    return username.charAt(0);
  };

  return (
    <StyledChatContainer>
      <StyledChatSidebar>
        <StyledChatHeader mb={10}>
          <StyledText>kweku@gmail.com</StyledText>
        </StyledChatHeader>
        <StyledChatHeader mb={0.5}>
          <StyledText>Online Users</StyledText>
        </StyledChatHeader>
        {onlineUsers.map((user) => (
          <StyledSidebarUser key={user.identity}>
            <StyledSidebarUserPlaceholder>
              <StyledText>{getUserInitial(user.username)}</StyledText>
            </StyledSidebarUserPlaceholder>
            <StyledSidebarText> {user.username} </StyledSidebarText>
          </StyledSidebarUser>
        ))}
      </StyledChatSidebar>
      {selectedUser ? (
        <StyledChatArea>
          <StyledChatMessageArea>
            <StyledMsg>
              <StyledMsgImg>K</StyledMsgImg>
              <StyledMsgBubble>
                <StyledMsgInfo>
                  <StyledMsgInfoName>BOt</StyledMsgInfoName>
                  <StyledMsgInfoTime>12:30</StyledMsgInfoTime>
                </StyledMsgInfo>

                <StyledMsgText>
                  Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
                </StyledMsgText>
              </StyledMsgBubble>
            </StyledMsg>
          </StyledChatMessageArea>
          <StyledChatForm>
            <StyledChatInput />
            <StyledBtn>Send</StyledBtn>
          </StyledChatForm>
        </StyledChatArea>
      ) : (
        <ChatWelcome />
      )}
    </StyledChatContainer>
  );
};

export default MainChat;
