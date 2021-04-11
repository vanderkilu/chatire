import { UserDTO } from "dtos/user.dto";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";

class UserService {
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
}

export default UserService;
