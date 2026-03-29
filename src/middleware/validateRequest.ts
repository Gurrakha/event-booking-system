import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

// Generic request body parser to match the zod schema
const validateRequest =
  (schema: ZodObject) =>
  async (req: Request, _: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
      });

      req.body = parsed.body;
      return next();
    } catch (error) {
      return next(error);
    }
  };

export default validateRequest;
