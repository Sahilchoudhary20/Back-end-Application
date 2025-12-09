import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
    if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
    return next();
  };
}
