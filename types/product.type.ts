import {Document, Types} from "mongoose";
import { ICategory } from "./categories.type";

export interface IProduct {
    name: string;
    productCode: string;
    category: Types.ObjectId | ICategory; 
    supplier: string;
    description: string;
    quantity: number;
    minStock: number;
    price: number;
    location: string;
    status: string;
    imageUrl: string;
    lastRestocked: Date;
    lastOrdered: Date;
}

export interface IProductDocument extends IProduct, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

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