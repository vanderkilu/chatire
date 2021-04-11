import { Chat } from "../interfaces/chat.interface";
import * as mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    message: String,
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model<Chat & mongoose.Document>("Chat", ChatSchema);
export default ChatModel;
