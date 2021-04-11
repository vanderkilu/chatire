import { NextFunction, Response } from "express";
import { IChatService } from "../interfaces/chat.service.interface";
import { RequestWithUser } from "../interfaces/routes.interface";
import { ChatDTO } from "../dtos/chat.dto";

class UserController {
  private chatService: IChatService;

  constructor(chatService: IChatService) {
    this.chatService = chatService;
  }

  createConversation = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const toUserId = req.body.toUserId;
      const chats = await this.chatService.createConversationIfNotExist(
        req.user.sub,
        toUserId
      );
      res.status(200).json(chats);
    } catch (err) {
      next(err);
    }
  };

  createChat = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const chatData: ChatDTO = req.body;
      const chat = await this.chatService.createChat(chatData, req.user.sub);
      res.status(200).json(chat);
    } catch (err) {
      next(err);
    }
  };

  getChatBetweenUsers = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const toUserId = req.params.toUserId;
      const chats = await this.chatService.getChatBetweenUsers(
        req.user.sub,
        toUserId
      );
      res.status(200).json(chats);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
