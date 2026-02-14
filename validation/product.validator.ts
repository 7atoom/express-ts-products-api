import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("productCode")
    .notEmpty()
    .withMessage("Product code is required")
    .isString()
    .withMessage("Product code must be a string"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Category must be a valid MongoDB ObjectId"),
  body("supplier")
    .notEmpty()
    .withMessage("Supplier is required")
    .isString()
    .withMessage("Supplier must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ gt: -1 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),
  body("minStock")
    .notEmpty()
    .withMessage("Minimum stock is required")
    .isInt({ gt: 0 })
    .withMessage("Minimum stock must be an integer greater than 0"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be a string"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["inStock", "lowStock", "outOfStock"])
    .withMessage("Status must be one of: inStock, lowStock, outOfStock"),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validatePartialProduct = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("productCode")
    .optional()
    .isString()
    .withMessage("Product code must be a string"),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Category must be a valid MongoDB ObjectId"),
  body("supplier")
    .optional()
    .isString()
    .withMessage("Supplier must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("quantity")
    .optional()
    .isInt({ gt: -1 })
    .withMessage("Quantity must be an integer greater than or equal to 0"),
  body("minStock")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Minimum stock must be an integer greater than 0"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL"),
  body("status")
    .optional()
    .isIn(["inStock", "lowStock", "outOfStock"])
    .withMessage("Status must be one of: inStock, lowStock, outOfStock"),
  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.body.name && !req.body.price) {
      return res
        .status(400)
        .json({
          errors: [
            { msg: "At least one field (name or price) must be provided" },
          ],
        });
    }
    next();
  },
];

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
