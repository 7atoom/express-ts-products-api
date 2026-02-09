import { Document, Types } from "mongoose";

export interface IUser {
    Fname: string;
    Lname: string;
    email: string;
    password: string;
    token: string;
}

export interface IUserDocument extends IUser, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}