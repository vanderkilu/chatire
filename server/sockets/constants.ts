export enum ChatEvent {
  CONNECT = "connection",
  DISCONNECT = "disconnect",
  CHAT = "chat",
  NEW_USER = "newUser",
  NEW_CHAT_MESSAGE = "newChatMessage",
  NEW_CONVERSATION = "newConversation",
  USER_LEAVE = "userLeave",
  LEAVE_CONVERSATION = "leaveConversation",
  USER_BLOCK = "userBlock",
  REMOVE_BLOCKER = "removeBlocker",
}
