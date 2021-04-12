import { Router } from "express";
import ChatService from "../services/chat.service";
import ChatController from "../controllers/chat.controller";
import Route from "../interfaces/routes.interface";
import { checkJwt } from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { ChatDTO } from "../dtos/chat.dto";

class UserRoute implements Route {
  public path = "/chats";
  public router = Router();
  public chatController = new ChatController(new ChatService());

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}`,
      checkJwt,
      validationMiddleware(ChatDTO),
      this.chatController.createChat
    );
    this.router.post(
      `${this.path}/conversation`,
      checkJwt,
      this.chatController.createConversation
    );
    this.router.get(
      `${this.path}/:toUserId`,
      checkJwt,
      this.chatController.getChatBetweenUsers
    );
  }
}

export default UserRoute;
