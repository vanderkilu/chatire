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
  conversation: string;
  fromUser: User;
  toUser: User;
}

export interface Conversation {
  _id: string;
  participants: User[];
}

export enum ChatEvent {
  CONNECT = "connection",
  CHAT = "chat",
  BLOCK = "block",
  NEW_USER = "newUser",
  NEW_CHAT_MESSAGE = "newChatMessage",
  NEW_CONVERSATION = "newConversation",
  USER_LEAVE = "userLeave",
  LEAVE_CONVERSATION = "leaveConversation",
}
