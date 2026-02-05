import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {httpStatusText} from "../utils/httpStatusText";
import {productService} from "../services/products.service";

const GetAllProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await productService.getAll();
    res.status(200)
        .json({
            status: httpStatusText.SUCCESS,
            results: products.length,
            data: products
        });
});

const GetProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.getById(req.params.id as string);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: product
    });
});

const CreateProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.create(req.body);
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: product
    });
});

const UpdateProduct = asyncHandler(async (req: Request, res: Response) => {
    const updatedFields = req.body;
    const product = await productService.update(req.params.id as string, updatedFields);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: product
    });
});

const DeleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.delete(req.params.id as string);
    res.status(204).send({
        status: httpStatusText.SUCCESS,
        data: product,
        message: 'Product deleted successfully'
    });
});

export default {
    GetAllProducts,
    GetProductById,
    CreateProduct,
    UpdateProduct,
    DeleteProduct
};

