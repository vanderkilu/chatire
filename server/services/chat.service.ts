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
    toUserIdentity: string
  ): Promise<Conversation> {
    const currentUser = await this.users.findOne({
      identity: fromUserIdentity,
    });
    const toUser = await this.users.findOne({
      identity: toUserIdentity,
    });
    const conversation = await this.conversations.findOne({
      participants: { $all: [currentUser.id, toUser.id] },
    });
    if (conversation) return conversation;
    const newConversation = await this.conversations.create({
      participants: [currentUser.id, toUser.id],
    });
    return newConversation;
  }

  public async getChatBetweenUsers(
    fromUserIdentity: string,
    toUserIdentity: string
  ): Promise<Chat[]> {
    const currentUser = await this.users.findOne({
      identity: fromUserIdentity,
    });
    const toUser = await this.users.findOne({
      identity: toUserIdentity,
    });
    const conversation = await this.conversations.findOne({
      participants: { $all: [currentUser.id, toUser.id] },
    });
    if (!conversation) {
      //if there is no conversation then there is no chats so return
      //empty array
      return [];
    }
    const chats = await this.chats
      .find({ conversation: conversation.id })
      .populate("fromUser")
      .populate("toUser");
    return chats;
  }

  public async createChat(chatData: ChatDTO, userIdentity: string) {
    const currentUser = await this.users.findOne({ identity: userIdentity });
    const toUser: User = await this.users.findOne({
      identity: chatData.toUser,
    });

    const conversation = await this.conversations.findOne({
      participants: { $all: [currentUser.id, toUser._id] },
    });

    if (!conversation) {
      throw new HttpException(
        400,
        "There is no conversation setup between the users"
      );
    }

    const chat = new this.chats({
      ...chatData,
      conversation: conversation.id,
      fromUser: currentUser.id,
      toUser: currentUser._id,
    });
    return chat
      .save()
      .then((t) => t.populate("fromUser").populate("toUser").execPopulate());
  }
}

export default ChatService;
