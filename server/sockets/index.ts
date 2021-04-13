import * as socket from "socket.io";
import { ChatEvent } from "./constants";

type User = {
  identity: string;
  username: string;
};

type ChatMessage = {
  message: string;
  conversationId: string;
};

class ChatSocketServer {
  private io: socket.Server;
  private onlineUsers: Set<string>;
  constructor(io: socket.Server) {
    this.io = io;
    this.onlineUsers = new Set();
  }

  public initSocket() {
    this.io.sockets.on(ChatEvent.CONNECT, (socket: socket.Socket) => {
      console.log("user connected");
      socket.on(ChatEvent.NEW_USER, (data: User) => {
        const value = JSON.stringify(data);
        this.onlineUsers.add(value);
        socket.data = value;
        this.io.emit(
          ChatEvent.NEW_USER,
          [...this.onlineUsers].map((user) => JSON.parse(user))
        );
      });

      socket.on(ChatEvent.DISCONNECT, () => {
        const value = socket.data;
        this.onlineUsers.delete(value);
        console.log("user left chat", value);
        this.io.emit(ChatEvent.USER_LEAVE, value);
      });

      socket.on(ChatEvent.NEW_CONVERSATION, (conversationId: string) => {
        console.log("conversation room setup", conversationId);
        socket.join(conversationId);
      });

      socket.on(ChatEvent.LEAVE_CONVERSATION, (conversationId: string) => {
        console.log("conversation room disonnected", conversationId);
        socket.leave(conversationId);
      });

      socket.on(ChatEvent.CHAT, (chatMsg: ChatMessage) => {
        this.io.sockets
          .in(chatMsg.conversationId)
          .emit(ChatEvent.NEW_CHAT_MESSAGE, chatMsg);
      });
    });
  }
}

export default ChatSocketServer;
