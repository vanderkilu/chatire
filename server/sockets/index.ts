import * as socket from "socket.io";
import { ChatEvent } from "./constants";

type User = {
  id: string;
  username: string;
};

type ChatMessage = {
  message: string;
  conversationId: string;
};

class ChatSocketServer {
  private io: socket.Server;
  private onlineUsers: Set<User>;
  constructor(io: socket.Server) {
    this.io = io;
    this.onlineUsers = new Set();
  }

  public initSocket() {
    this.io.sockets.on(ChatEvent.CONNECT, (socket: socket.Socket) => {
      console.log("user connected");
      socket.on(ChatEvent.NEW_USER, (data: User) => {
        this.onlineUsers.add(data);
        this.io.emit(ChatEvent.NEW_USER, [...this.onlineUsers]);
      });

      socket.on(ChatEvent.DISCONNECT, (data: User) => {
        this.onlineUsers.delete(data);
        this.io.emit(ChatEvent.USER_LEAVE, data);
      });

      socket.on(ChatEvent.NEW_CONVERSATION, (conversationId: string) => {
        socket.join(conversationId);
      });

      socket.on(ChatEvent.LEAVE_CONVERSATION, (conversationId: string) => {
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
