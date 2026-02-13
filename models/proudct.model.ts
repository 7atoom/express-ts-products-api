import * as mongoose from "mongoose";
import {IProductDocument} from "../types/product.type";
const Schema = mongoose.Schema;

const ProductSchema = new Schema<IProductDocument>(
    {
    name: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    minStock: {
        type: Number,
        required: true
    },  
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['inStock', 'lowStock', 'outOfStock'],
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    lastRestocked: {
        type: Date,
        default: null
    },
    lastOrdered: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;


// "products": [
//     {
//       "id": "1",
//       "name": "Laptop Pro 15",
//       "productCode": "LP15-2026",
//       "category": "Electronics",
//       "supplier": "Dell",
//       "description": "High-performance laptop with 16GB RAM and 512GB SSD",
//       "quantity": 25,
//       "minStock": 5,
//       "price": 1299.99,
//       "location": "Aisle 1",
//       "status": "inStock",
//       "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
//       "createdAt": "2026-01-15T10:00:00Z",
//       "lastRestocked": "2026-01-20T00:00:00.000Z",
//       "lastOrdered": ""
//     },