import { User } from "../interfaces/user.interface";
import { ChatDTO } from "../dtos/chat.dto";
import { Chat } from "../interfaces/chat.interface";
import chatModel from "../models/chat.model";
import userModel from "../models/user.model";
import conversationModel from "../models/converstation.model";
import HttpException from "../exceptions/HttpException";
import { IChatService } from "../interfaces/chat.service.interface";
import { Conversation } from "../interfaces/conversation.interface";

class ChatService implements IChatService {
  private chats = chatModel;
  private users = userModel;
  private conversations = conversationModel;

  public async createConversationIfNotExist(
    fromUserIdentity: string,
    toUserId: string
  ): Promise<Conversation> {
    const currentUser = await this.users.findOne({
      identity: fromUserIdentity,
    });
    const conversation = await this.conversations.findOne({
      fromUser: currentUser.id,
      toUser: toUserId,
    });
    if (conversation) return conversation;
    const newConversation = await this.conversations.create({
      fromUser: currentUser.id,
      toUser: toUserId,
    });
    newConversation.populate("fromUser");
    newConversation.populate("toUser");
    return newConversation;
  }

  public async getChatBetweenUsers(
    fromUserIdentity: string,
    toUserId: string
  ): Promise<Chat[]> {
    const currentUser = await this.users.findOne({
      identity: fromUserIdentity,
    });
    const conversation = await this.conversations.findOne({
      fromUser: currentUser.id,
      toUser: toUserId,
    });
    if (!conversation) {
      throw new HttpException(
        400,
        "There is no conversation setup between the users"
      );
    }
    const chats = await this.chats
      .find({ conversation: conversation.id })
      .populate("conversation");
    return chats;
  }

  public async createChat(chatData: ChatDTO, userIdentity: string) {
    const currentUser = await this.users.findOne({ identity: userIdentity });
    const toUser: User = await this.users.findById(chatData.toUser);
    if (toUser.isBlocked) {
      throw new HttpException(400, "Can't chat with blocked user");
    }

    let conversation = await this.conversations.findOne({
      fromUser: currentUser.id,
      toUser: chatData.toUser,
    });
    if (!conversation) {
      throw new HttpException(
        400,
        "There is no conversation setup between the users"
      );
    }

    const chat = await this.chats.create({
      ...chatData,
      conversation: conversation.id,
    });
    chat.populate("conversation");
    return chat;
  }
}

export default ChatService;
