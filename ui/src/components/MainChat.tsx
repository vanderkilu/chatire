import styled from "styled-components";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Chat, ChatEvent, User } from "../types";
import ChatWelcome from "./ChatWelcome";
import ChatArea from "./ChatArea";
import { StyledText } from "./sharedStyles";
import OnlineUser from "./OnlineUser";
import { createConversation, getChats } from "../api/api";

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

const MainChat: React.FC<{}> = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [currentChats, setCurrentChats] = useState<Chat[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const USER = { identity: user.sub, username: user.name };
    socket.emit(ChatEvent.NEW_USER, USER);
    socket.on(ChatEvent.NEW_USER, (users: User[]) => {
      setOnlineUsers(users);
    });
    return () => {};
  }, []);

  const initiateConversation = async (id: string) => {
    const selectedUser = onlineUsers.find((user) => user.identity === id);
    setSelectedUser(selectedUser);
    setIsChatLoading(true);
    const token = await getAccessTokenSilently();
    try {
      if (selectedUser) {
        const conversation = await createConversation(
          selectedUser.identity,
          token
        );
        socket.emit(ChatEvent.NEW_CONVERSATION, conversation._id);
        const chats = await getChats(selectedUser.identity, token);
        setCurrentChats(chats);
        setIsChatLoading(false);
      }
    } catch (err) {
      setIsChatLoading(false);
    }
  };

  const sendMessage = (msg: string) => {
    console.log("message", msg);
  };

  return (
    <StyledChatContainer>
      <StyledChatSidebar>
        <StyledChatHeader mb={10}>
          <StyledText>{user.email}</StyledText>
        </StyledChatHeader>
        <StyledChatHeader mb={0.5}>
          <StyledText>Online Users</StyledText>
        </StyledChatHeader>
        {onlineUsers.map((user) => (
          <OnlineUser
            user={user}
            key={user.identity}
            initiateConversation={initiateConversation}
          />
        ))}
      </StyledChatSidebar>
      {selectedUser ? (
        <ChatArea
          isLoading={isChatLoading}
          chats={currentChats}
          sendMessage={sendMessage}
        />
      ) : (
        <ChatWelcome />
      )}
    </StyledChatContainer>
  );
};

export default MainChat;
