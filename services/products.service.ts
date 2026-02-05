import Product from "../models/proudct.model";
import {ICrudService} from "../types/crud.type";
import {IProductDocument} from "../types/product.type";
import {CustomError} from "../utils/customError";

export class ProductService implements ICrudService<IProductDocument> {
    async getAll(): Promise<IProductDocument[]> {
        return Product.find();
    }

    async getById(id: string): Promise<IProductDocument> {
        const product = await Product.findById(id);
        if (!product) {
            throw new CustomError('Product not found', 404);
        }
        return product;
    }

    async create(data: Partial<IProductDocument>): Promise<IProductDocument> {
        const product = new Product(data);
        await product.save();
        return product;
    }

    async update(id: string, data: Partial<IProductDocument>): Promise<IProductDocument> {
        const product = await Product.findByIdAndUpdate(id, data, {new: true, runValidators: true});
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
