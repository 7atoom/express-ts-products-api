import {Document, Types} from "mongoose";

export interface IProduct {
    name: string;
    price: number;
}

export interface IProductDocument extends IProduct, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}