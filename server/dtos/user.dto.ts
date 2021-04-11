import { IsString } from "class-validator";

export class UserDTO {
  @IsString()
  public username: string;
}
