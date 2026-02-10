import jwt, { SignOptions } from "jsonwebtoken";
import { IAuthPayload } from "../types/auth.type";
import { env } from "../config/env";
import { CustomError } from "../utils/customError";

class JwtService {
  generateToken(payload: IAuthPayload): string {
    try {
      const options: SignOptions = {
        expiresIn: env.ACCESS_TOKEN.lifetime as any,
      };
      return jwt.sign(payload, env.ACCESS_TOKEN.secret, options);
    } catch (err: any) {
      throw new CustomError(`Error generating token: ${err.message}`, 500);
    }
  }

  generateRefreshToken(payload: IAuthPayload): string {
    try {
      const options: SignOptions = {
        expiresIn: env.REFRESH_TOKEN.lifetime as any,
      };
      return jwt.sign(payload, env.REFRESH_TOKEN.secret, options);
    } catch (err: any) {
      throw new CustomError(
        `Error generating refresh token: ${err.message}`,
        500,
      );
    }
  }

  verifyToken(token: string): IAuthPayload {
    try {
      return jwt.verify(token, env.ACCESS_TOKEN.secret) as IAuthPayload;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw new CustomError("Access token has expired", 401);
      }
      if (err.name === "JsonWebTokenError") {
        throw new CustomError(`Invalid access token: ${err.message}`, 401);
      }
      throw new CustomError(`Error verifying token: ${err.message}`, 500);
    }
  }

  verifyRefreshToken(token: string): IAuthPayload {
    try {
      return jwt.verify(token, env.REFRESH_TOKEN.secret) as IAuthPayload;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw new CustomError("Refresh token has expired", 401);
      }
      if (err.name === "JsonWebTokenError") {
        throw new CustomError(`Invalid refresh token: ${err.message}`, 401);
      }
      throw new CustomError(
        `Invalid or expired refresh token: ${err.message}`,
        401,
      );
    }
  }
}

export default new JwtService();
