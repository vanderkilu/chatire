import styled from "styled-components";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BlockedUser, Chat, ChatEvent, User } from "../types";
import ChatWelcome from "./ChatWelcome";
import ChatArea from "./ChatArea";
import { StyledText } from "./sharedStyles";
import OnlineUser from "./OnlineUser";
import { useToasts } from "react-toast-notifications";
import {
  blockUser,
  createChat,
  createConversation,
  getChats,
} from "../api/api";
import { SERVER_ERROR } from "../constants";

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
  const { addToast } = useToasts();

  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [currentChats, setCurrentChats] = useState<Chat[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const clearEvents = () => {
    socket.off(ChatEvent.NEW_USER);
    socket.off(ChatEvent.NEW_CHAT_MESSAGE);
  };

  useEffect(() => {
    const USER = { identity: user.sub, username: user.name, isBlocked: false };
    socket.emit(ChatEvent.NEW_USER, USER);

    socket.on(ChatEvent.NEW_USER, (users: User[]) => {
      const onlineUsers = users.filter((u) => u.identity !== user.sub);
      setOnlineUsers(onlineUsers);
    });

    socket.on(ChatEvent.NEW_CHAT_MESSAGE, (chat: Chat) => {
      setCurrentChats((chats) => [...chats, chat]);
    });

    socket.on(ChatEvent.USER_LEAVE, (offlineUser: User) => {
      setOnlineUsers((users) =>
        users.filter((u) => u.identity !== offlineUser.identity)
      );
      setSelectedUser(undefined);
    });

    socket.on(ChatEvent.REMOVE_BLOCKER, (data: BlockedUser) => {
      if (data.blockee.identity === user.sub) {
        setOnlineUsers((users) =>
          users.filter((u) => u.identity !== data.blocker.identity)
        );
      }
    });

    return () => {
      clearEvents();
    };
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
      addToast(SERVER_ERROR, {
        appearance: "error",
        autoDismiss: true,
      });
      setIsChatLoading(false);
    }
  };

  const sendMessage = async (msg: string) => {
    const token = await getAccessTokenSilently();
    if (selectedUser) {
      try {
        const message = await createChat(
          { message: msg, toUser: selectedUser.identity },
          token
        );
        const MESSAGE = {
          ...message,
          conversationId: message.conversation,
        };
        socket.emit(ChatEvent.CHAT, MESSAGE);
      } catch (err) {
        addToast(SERVER_ERROR, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  const toggleUserBlock = async (id: string) => {
    const token = await getAccessTokenSilently();
    try {
      const response = await blockUser(id, token);
      setOnlineUsers((users) =>
        users.map((u) =>
          u.identity === id ? { ...u, isBlocked: response.blockStatus } : u
        )
      );
      if (selectedUser?.identity === id) {
        const newUser = { ...selectedUser, isBlocked: response.blockStatus };
        setSelectedUser(newUser);
      }
      const data: BlockedUser = {
        blocker: response.user,
        blockee: response.blockedUser,
      };
      socket.emit(ChatEvent.USER_BLOCK, data);
    } catch {
      addToast(SERVER_ERROR, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <StyledChatContainer>
      <StyledChatSidebar>
        <StyledChatHeader mb={10}>
          <StyledText color="#212121">{user.email}</StyledText>
        </StyledChatHeader>
        <StyledChatHeader mb={0.5}>
          <StyledText color="#212121">Online Users</StyledText>
        </StyledChatHeader>
        {onlineUsers.map((user) => (
          <OnlineUser
            toggleUserBlock={toggleUserBlock}
            user={user}
            key={user.identity}
            initiateConversation={initiateConversation}
          />
        ))}
      </StyledChatSidebar>
      {selectedUser ? (
        <ChatArea
          isDisabled={selectedUser.isBlocked}
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
