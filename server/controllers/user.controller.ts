import { NextFunction, Response } from "express";
import { IUserService } from "../interfaces/user.service.interface";
import { RequestWithUser } from "../interfaces/routes.interface";
import { UserDTO } from "../dtos/user.dto";

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  createUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: UserDTO = {
        username: req.body.username,
      };
      const user = await this.userService.createUser(userData, req.user.sub);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  toggleUserBlock = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userIdentity = req.body.userId;
      const user = await this.userService.toggleUserBlock(
        req.user.sub,
        userIdentity
      );
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
