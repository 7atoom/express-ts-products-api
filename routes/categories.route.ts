import express from "express";
import categoriesController from "../controllers/categories.controller";
import { validateCategory } from "../validation/category.validator";

const router = express.Router();

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
router.post('/', validateCategory, categoriesController.createCategory);
router.patch('/:id', validateCategory, categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export default router;
