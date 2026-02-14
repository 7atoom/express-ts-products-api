import { CategoryModel } from "../models/category.model";
import { ICrudService } from "../types/crud.type";
import { ICategoryDocument } from "../types/categories.type";
import { CustomError } from "../utils/customError";
import mongoose from "mongoose";

export class CategoryService implements ICrudService<ICategoryDocument> {
    async getAll(): Promise<ICategoryDocument[]> {
        return CategoryModel.find();
    }

    async getById(id: string): Promise<ICategoryDocument> {
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new CustomError('Invalid ID format', 400);
        }

        const category = await CategoryModel.findById(id);
        if (!category) {
            throw new CustomError('Category not found', 404);
        }
        return category;
    }

    async create(data: Partial<ICategoryDocument>): Promise<ICategoryDocument> {
        const existingCategory = await CategoryModel.findOne({ name: data.name });
        if (existingCategory) {
            throw new CustomError('Category with this name already exists', 409);
        }

        const category = new CategoryModel(data);
        await category.save();
        return category;
    }

    async update(id: string, data: Partial<ICategoryDocument>): Promise<ICategoryDocument> {
        if (data.name) {
            const existingCategory = await CategoryModel.findOne({ 
                name: data.name, 
                _id: { $ne: id } 
            });
            if (existingCategory) {
                throw new CustomError('Category with this name already exists', 409);
            }
        }

        const category = await CategoryModel.findByIdAndUpdate(id, data, { 
            new: true, 
            runValidators: true 
        });
        
        if (!category) {
            throw new CustomError('Category not found', 404);
        }
        return category;
    }

    async delete(id: string): Promise<void> {
        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) {
            throw new CustomError('Category not found', 404);
        }
    }

    async getByName(name: string): Promise<ICategoryDocument | null> {
        return CategoryModel.findOne({ name });
    }
}

export const categoryService = new CategoryService();