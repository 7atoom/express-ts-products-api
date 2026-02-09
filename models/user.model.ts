import * as mongoose from 'mongoose';
import { IUserDocument } from '../types/user.type';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
    {
        Fname: {
            type: String,
            required: true
        },
        Lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;