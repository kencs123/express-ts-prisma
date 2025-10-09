import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateProduct = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required and must be a string'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(value => value > 0)
    .withMessage('Price must be greater than 0'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];