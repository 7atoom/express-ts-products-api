import Product from "../models/proudct.model";
import {ICrudService} from "../types/crud.type";
import {IProductDocument} from "../types/product.type";
import {CustomError} from "../utils/customError";
import { categoryService } from "./categories.service";

export class ProductService implements ICrudService<IProductDocument> {
    async getAll(): Promise<IProductDocument[]> {
        return Product.find().populate('category', 'name');
    }

    async getById(id: string): Promise<IProductDocument> {
        const product = await Product.findById(id).populate('category', 'name');
        if (!product) {
            throw new CustomError('Product not found', 404);
        }
        return product;
    }

    async create(data: Partial<IProductDocument>): Promise<IProductDocument> {
        // Validate that category exists
        if (data.category) {
            const category = await categoryService.getById(data.category.toString());
            if (!category) {
                throw new CustomError('Category not found', 404);
            }
        }

        const product = new Product(data);
        await product.save();
        return product.populate('category', 'name');
    }

    async update(id: string, data: Partial<IProductDocument>): Promise<IProductDocument> {
        // Validate that category exists if being updated
        if (data.category) {
            const category = await categoryService.getById(data.category.toString());
            if (!category) {
                throw new CustomError('Category not found', 404);
            }
        }

        const product = await Product.findByIdAndUpdate(id, data, {
            new: true, 
            runValidators: true
        }).populate('category', 'name');
        
        if (!product) {
            throw new CustomError('Product not found', 404);
        }
        return product;
    }

    async delete(id: string): Promise<void> {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new CustomError('Product not found', 404);
        }
    }
}

export const productService = new ProductService();
