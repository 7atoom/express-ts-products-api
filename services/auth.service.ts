import jwtService from "./jwt.service";
import { userService } from "./users.service";
import { IUserDocument } from "../types/user.type";
import { LoginData } from "../types/auth.type";
import { IAuthPayload } from "../types/auth.type";
import { CustomError } from "../utils/customError";

class AuthService {
  async register(userData: Partial<IUserDocument>) {
    const user = await userService.create(userData);
    const payload: IAuthPayload = {
      userId: user._id.toString(),
      email: user.email,
    };
    const accessToken = jwtService.generateToken(payload);
    const refreshToken = jwtService.generateRefreshToken(payload);
    return { user, accessToken, refreshToken };
  }

  async login(loginData: LoginData) {
    const user = await userService.getByEmail(loginData.email);
    if (!user) {
      throw new CustomError("Invalid email or password", 401);
    }
    const isMatch = await user.comparePassword(loginData.password);
    if (!isMatch) {
      throw new CustomError("Invalid email or password", 401);
    }
    const payload: IAuthPayload = {
      userId: user._id.toString(),
      email: user.email,
    };
    const accessToken = jwtService.generateToken(payload);
    const refreshToken = jwtService.generateRefreshToken(payload);
    return { user, accessToken, refreshToken };
  }

  refreshTokens(refreshToken: string): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = jwtService.verifyRefreshToken(refreshToken);
    const newAccessToken = jwtService.generateToken(payload);
    const newRefreshToken = jwtService.generateRefreshToken(payload);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}

export default new AuthService();
