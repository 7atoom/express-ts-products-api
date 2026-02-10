import express from "express";
import ProductsController from '../controllers/products.controller';
import {validateProduct, validatePartialProduct} from '../validation/product.validator';
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.route('/')
    .get(authenticate, ProductsController.GetAllProducts)
    .post(authenticate, validateProduct, ProductsController.CreateProduct);

router.route('/:id')
    .get(authenticate, ProductsController.GetProductById)
    .patch(authenticate, validatePartialProduct, ProductsController.UpdateProduct)
    .put(authenticate, validateProduct, ProductsController.UpdateProduct)
    .delete(authenticate, ProductsController.DeleteProduct);

export default router;
