import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

export const validateUser = [
    body('Fname')
        .notEmpty()
        .withMessage('First name is required')
        .isString()
        .withMessage('First name must be a string')
        .isLength({min: 2})
        .withMessage('First name must be at least 2 characters long'),
    body('Lname')
        .notEmpty()
        .withMessage('Last name is required')
        .isString()
        .withMessage('Last name must be a string')
        .isLength({min: 2})
        .withMessage('Last name must be at least 2 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

export const validatePartialUser = [
    body('Fname')
        .optional()
        .isString()
        .withMessage('First name must be a string')
        .isLength({min: 2})
        .withMessage('First name must be at least 2 characters long'),
    body('Lname')
        .optional()
        .isString()
        .withMessage('Last name must be a string')
        .isLength({min: 2})
        .withMessage('Last name must be at least 2 characters long'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .optional()
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        if (!req.body.Fname && !req.body.Lname && !req.body.email && !req.body.password) {
            return res.status(400).json({errors: [{msg: 'At least one field (Fname, Lname, email, or password) must be provided'}]});
        }
        next();
    }
];