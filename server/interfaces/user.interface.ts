export interface User {
  _id: string;
  identity: string;
  username: string;
  blockList?: string[];
  blockedBy?: string[];
}
