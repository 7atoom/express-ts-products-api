import {Request, Response} from 'express';
import Product from "../models/proudct.model";

const GetAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.json(products);
}

const GetProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
}

const CreateProduct = async (req: Request, res: Response) => {
    const newProduct = req.body;
    const product = new Product(newProduct);
    await product.save();
    res.status(201).json(product);
}

const ReplaceProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true, overwrite: true });
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
}

const UpdateProduct = async (req: Request, res: Response) => {
    try {
        const updatedFields = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true, runValidators: true }
        );
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
}

const DeleteProduct = async (req: Request, res:Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(204).send();
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
}

export default {
    GetAllProducts,
    GetProductById,
    CreateProduct,
    ReplaceProduct,
    UpdateProduct,
    DeleteProduct
};

