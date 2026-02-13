import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { httpStatusText } from "../utils/httpStatusText";
import { categoryService } from '../services/categories.service';

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await categoryService.getAll();
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { categories }
    });
});

const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.getById(req.params.id as string);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { category }
    });
});

const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.create(req.body);
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: { category }
    });
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.update(req.params.id as string, req.body);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { category }
    });
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    await categoryService.delete(req.params.id as string);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null
    });
});

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
