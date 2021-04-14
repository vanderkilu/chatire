export interface User {
  identity: string;
  username: string;
  isBlocked: boolean;
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

export interface BlockedUser {
  blocker: User;
  blockee: User;
}

export enum ChatEvent {
  CONNECT = "connection",
  CHAT = "chat",
  NEW_USER = "newUser",
  NEW_CHAT_MESSAGE = "newChatMessage",
  NEW_CONVERSATION = "newConversation",
  USER_LEAVE = "userLeave",
  LEAVE_CONVERSATION = "leaveConversation",
  REMOVE_BLOCKER = "removeBlocker",
  USER_BLOCK = "userBlock",
}
