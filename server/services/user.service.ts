import { UserDTO } from "dtos/user.dto";
import { IUserService } from "../interfaces/user.service.interface";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";

class UserService implements IUserService {
  private users = userModel;

  public async createUser(userData: UserDTO, identity: string): Promise<User> {
    console.log("something");
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

  public async toggleUserBlock(
    currentUserIdentity: string,
    blockUserIdentity: string
  ): Promise<{ user: User; blockedUser: User; blockStatus: boolean }> {
    const currentUser = await this.users.findOne({
      identity: currentUserIdentity,
    });
    const userToBlock = await this.users.findOne({
      identity: blockUserIdentity,
    });

    // if user is already blocked unblock that user
    if (currentUser.blockList.includes(userToBlock._id)) {
      await (currentUser.blockList as any).pull({ _id: userToBlock._id });
      await (userToBlock.blockedBy as any).pull({ _id: currentUser._id });

      await currentUser.save();
      await userToBlock.save();

      return {
        blockStatus: false,
        user: currentUser,
        blockedUser: userToBlock,
      };
    }

    currentUser.blockList.push(userToBlock._id);
    userToBlock.blockedBy.push(currentUser._id);

    await currentUser.save();
    await userToBlock.save();

    return {
      blockStatus: true,
      user: currentUser,
      blockedUser: userToBlock,
    };
  }
}

export default UserService;
