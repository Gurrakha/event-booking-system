import { NextFunction, Request, RequestHandler, Response } from 'express';

// this wrapper ensures that any error thrown is passed to error handler correctly
const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Execute the provided request handler
      await fn(req, res, next);
    } catch (error) {
      // Forward any caught error to Express error-handling middleware
      next(error);
    }
  };

export default catchAsync;
