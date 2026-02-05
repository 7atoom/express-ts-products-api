import express from "express";
import ProductsController from '../controllers/products.controller';
import {validateProduct, validatePartialProduct} from '../middlewares/validator.middleware';

const router = express.Router();

router.route('/')
    .get(ProductsController.GetAllProducts)
    .post(validateProduct, ProductsController.CreateProduct);

router.route('/:id')
    .get(ProductsController.GetProductById)
    .patch(validatePartialProduct, ProductsController.UpdateProduct)
    .put(validateProduct, ProductsController.UpdateProduct)
    .delete(ProductsController.DeleteProduct);

export default router;
