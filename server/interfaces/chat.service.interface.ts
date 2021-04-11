import { ChatDTO } from "../dtos/chat.dto";
import { Chat } from "./chat.interface";
import { Conversation } from "./conversation.interface";

export interface IChatService {
  createChat(chatData: ChatDTO, identity: string): Promise<Chat>;
  getChatBetweenUsers(fromUser: string, toUser: string): Promise<Chat[]>;
  createConversationIfNotExist(
    fromUserIdentity: string,
    toUserId: string
  ): Promise<Conversation>;
}
