import { UserDTO } from "dtos/user.dto";
import { IUserService } from "../interfaces/user.service.interface";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";

class UserService implements IUserService {
  private users = userModel;

  public async createUser(userData: UserDTO, identity: string): Promise<User> {
    const alreadyExistingUser = await this.users.findOne({
      identity: identity,
    });
    if (alreadyExistingUser) return alreadyExistingUser;
    const user = await this.users.create({
      identity,
      username: userData.username,
    });
    return user;
  }

  public async toggleUserBlock(userId: string): Promise<User> {
    const user = await this.users.findById(userId);
    user.isBlocked = !user.isBlocked;
    await user.save();
    return user;
  }
}

export default UserService;
