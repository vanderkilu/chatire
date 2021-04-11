import { UserDTO } from "../dtos/user.dto";
import { User } from "./user.interface";

export interface IUserService {
  createUser(userData: UserDTO, identity: string): Promise<User>;
}
