import * as mongoose from "mongoose";
import {IProductDocument} from "../types/product.type";
const Schema = mongoose.Schema;

const ProductSchema = new Schema<IProductDocument>(
    {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;