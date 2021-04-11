import { IsString } from "class-validator";

export class ChatDTO {
  @IsString()
  public message: string;

  @IsString()
  public toUser: string;
}
