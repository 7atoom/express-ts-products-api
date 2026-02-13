import { Document, Types } from "mongoose";

export interface ICategory {
  name: string;
}

export interface ICategoryDocument extends ICategory, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

