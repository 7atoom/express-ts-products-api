import {Request, Response} from 'express';
import {products} from "../data/products";


const GetAllProducts = (req: Request, res: Response) => {
    res.json(products);
}

const GetProductById = (req: Request, res: Response) => {
    const productId = parseInt(req.params.id as string);
    const product = products.find(p => p.id === productId);
    if (product) {
        console.log(product);
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
}

const CreateProduct = (req: Request, res: Response) => {
    const newProduct = req.body;
    const ProductId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    console.log(newProduct);
    products.push({id: ProductId, ...newProduct});
    res.status(201).json(newProduct);
}

const ReplaceProduct = (req: Request, res: Response) => {
    const productId = parseInt(req.params.id as string);
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products[index] = { id: productId, ...updatedProduct };
        res.json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
}

const UpdateProduct = (req: Request, res: Response) => {
    const productId = parseInt(req.params.id as string);
    const updatedFields = req.body;
    const product = products.find(p => p.id === productId);
    if (product) {
        Object.assign(product, updatedFields);
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
}

const DeleteProduct = (req: Request, res:Response) => {
    const productId = parseInt(req.params.id as string);
    const index = products.findIndex(p => p.id === productId);
    if (index === -1) {
        return res.status(404).send('Product not found');
    }
    products.splice(index, 1);
    res.status(204).send();
}

export default {
    GetAllProducts,
    GetProductById,
    CreateProduct,
    ReplaceProduct,
    UpdateProduct,
    DeleteProduct
};

