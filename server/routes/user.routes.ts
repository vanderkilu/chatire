import { Router } from "express";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import Route from "../interfaces/routes.interface";
import { checkJwt } from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { UserDTO } from "../dtos/user.dto";

class UserRoute implements Route {
  public path = "/users";
  public router = Router();
  public userController = new UserController(new UserService());

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}`,
      checkJwt,
      validationMiddleware(UserDTO),
      this.userController.createUser
    );
    this.router.get(
      `${this.path}/block/:userId`,
      checkJwt,
      this.userController.toggleUserBlock
    );
  }
}

export default UserRoute;
