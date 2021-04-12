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
      fromUser: currentUser.id,
      toUser: toUser.id,
    });
    if (conversation) return conversation;
    const newConversation = await this.conversations.create({
      fromUser: currentUser.id,
      toUser: toUser.id,
    });
    newConversation.populate("fromUser");
    newConversation.populate("toUser");
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
      fromUser: currentUser.id,
      toUser: toUser.id,
    });
    if (!conversation) {
      //if there is no conversation then there is no chats so return
      //empty array
      return [];
    }
    const chats = await this.chats
      .find({ conversation: conversation.id })
      .populate({
        path: "conversation",
        populate: [
          { path: "fromUser", model: "User" },
          { path: "toUser", model: "User" },
        ],
      });
    return chats;
  }

  public async createChat(chatData: ChatDTO, userIdentity: string) {
    const currentUser = await this.users.findOne({ identity: userIdentity });
    const toUser: User = await this.users.findOne({
      identity: chatData.toUser,
    });

    // if (toUser.isBlocked) {
    //   throw new HttpException(400, "Can't chat with blocked user");
    // }

    let conversation = await this.conversations.findOne({
      fromUser: currentUser.id,
      toUser: toUser._id,
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
    });
    return chat.save().then((t) =>
      t
        .populate({
          path: "conversation",
          populate: [
            { path: "fromUser", model: "User" },
            { path: "toUser", model: "User" },
          ],
        })
        .execPopulate()
    );
  }
}

export default ChatService;
