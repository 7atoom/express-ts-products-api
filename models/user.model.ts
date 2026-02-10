import * as mongoose from 'mongoose';
import { IUserDocument } from '../types/user.type';
import bcrypt from "bcrypt";
import {CustomError} from "../utils/customError";


const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
    {
        Fname: {
            type: String,
            required: [true, 'First name is required']
        },
        Lname: {
            type: String,
            required: [true, 'Last name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
    },
    { timestamps: true }
);

UserSchema.pre<IUserDocument>('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw new CustomError('Error hashing password', 500);
    }
});

UserSchema.methods.comparePassword = async function (
  this: IUserDocument,
  providedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(providedPassword, this.password);
};

export default mongoose.model<IUserDocument>('User', UserSchema);