import { User } from "../interfaces/user.interface";
import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    identity: String,
    username: String,
    isBlocked: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User & mongoose.Document>("User", UserSchema);
export default UserModel;
