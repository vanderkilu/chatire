import { Conversation } from "../interfaces/conversation.interface";
import * as mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model<Conversation & mongoose.Document>(
  "Conversation",
  ConversationSchema
);
export default ConversationModel;
