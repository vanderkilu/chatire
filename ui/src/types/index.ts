export interface User {
  identity: string;
  username: string;
}

export interface AuthUser {
  name: string;
  sub: string;
  email: string;
}

export interface Chat {
  message: string;
  conversation: Conversation;
}

export interface Conversation {
  _id: string;
  fromUser: User;
  toUser: User;
}

export enum ChatEvent {
  CONNECT = "connection",
  USER_DISCONNECT = "userDisconnect",
  CHAT = "chat",
  BLOCK = "block",
  NEW_USER = "newUser",
  NEW_CHAT_MESSAGE = "newChatMessage",
  NEW_CONVERSATION = "newConversation",
  USER_LEAVE = "userLeave",
  LEAVE_CONVERSATION = "leaveConversation",
}
