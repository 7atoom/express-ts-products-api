import * as mongoose from "mongoose";
import { ICategoryDocument } from "../types/categories.type";
const Schema = mongoose.Schema;

const CategorySchema = new Schema<ICategoryDocument>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

export const CategoryModel = mongoose.model<ICategoryDocument>("Category", CategorySchema);