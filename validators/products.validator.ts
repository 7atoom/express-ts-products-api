import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

export const validateProduct = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({gt: 0})
        .withMessage('Price must be a number greater than 0'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

export const validatePartialProduct = [
    body('name')
        .optional()
        .isString()
        .withMessage('Name must be a string')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long'),
    body('price')
        .optional()
        .isFloat({gt: 0})
        .withMessage('Price must be a number greater than 0'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        if (!req.body.name && !req.body.price) {
            return res.status(400).json({errors: [{msg: 'At least one field (name or price) must be provided'}]});
        }
        next();
    }
];
