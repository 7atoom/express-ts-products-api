import User from "../models/user.model";
import { ICrudService } from "../types/crud.type";
import { IUserDocument } from "../types/user.type";
import { CustomError } from "../utils/customError";

class UserService implements ICrudService<IUserDocument> {
  getAll(): Promise<IUserDocument[]> {
    return User.find().exec();
  }

  async getById(id: string): Promise<IUserDocument> {
    const user = await User.findById(id).exec();
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }

  async create(data: Partial<IUserDocument>): Promise<IUserDocument> {
    const existingUser = await User.findOne({ email: data.email }).exec();
    if (existingUser) {
      throw new CustomError("User with this email already exists", 400);
    }
    const user = new User(data);
    return user.save();
  }

  async update(
    id: string,
    data: Partial<IUserDocument>,
  ): Promise<IUserDocument> {
    const user = await User.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    const result = await User.findByIdAndDelete(id).exec();
    if (!result) {
      throw new CustomError("User not found", 404);
    }
  }

  async getByEmail(email: string): Promise<IUserDocument> {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return user;
  }
}

export const userService = new UserService();
