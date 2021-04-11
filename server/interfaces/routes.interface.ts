import { Router, Request } from "express";

interface Route {
  path: string;
  router: Router;
}

type AuthOUser = {
  sub: string;
};

export interface RequestWithUser extends Request {
  user: AuthOUser;
}

export default Route;
