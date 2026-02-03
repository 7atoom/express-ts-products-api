import express from "express";
import ProductsController from '../controllers/products.controller';
import { validateProduct } from '../validators/products.validator';

const router = express.Router();

router.route('/')
    .get(ProductsController.GetAllProducts)
    .post(validateProduct, ProductsController.CreateProduct);

router.route('/:id')
    .get(ProductsController.GetProductById)
    .put(validateProduct, ProductsController.ReplaceProduct)
    .patch(validateProduct, ProductsController.UpdateProduct)
    .delete(ProductsController.DeleteProduct);

export default router;
