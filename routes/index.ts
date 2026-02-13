import express from "express";
import productsRouter from './products.route';
import usersRouter from "./users.route";
import authRouter from "./auth.route";
import categoriesRouter from "./categories.route";


const router = express.Router();

router.use('/api/products', productsRouter);
router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);
router.use('/api/categories', categoriesRouter);

export default router;



