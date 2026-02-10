import { IAuthPayload } from "./auth.type";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload;
    }
  }
}

export {};
