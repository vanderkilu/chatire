import { User } from "../interfaces/user.interface";
import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    identity: String,
    username: String,
    //list of users this user has blocked
    blockList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //keep track of those who have blocked user
    //so user doesn't show up on their online list
    blockedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User & mongoose.Document>("User", UserSchema);
export default UserModel;
