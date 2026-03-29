import env from '@/config/env';
import { Prisma } from '@/generated/prisma/client';
import ApiError from '@/utils/apiError';
import { ErrorRequestHandler } from 'express';
import { status as httpStatus } from 'http-status';
import { ZodError } from 'zod';

// This global error handler handles all error whether generic, prisma or custom
const globalErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  // eslint-disable-next-line
  console.log(`[APP ERROR]`, {
    endpoint: req.url,
    method: req.method,
    payload: JSON.stringify(req.body),
    headers: req.headers,
    status: error.statusCode || 500,
    error,
  });

  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Internal server error';
  let errors: unknown[] | undefined;

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = httpStatus.BAD_REQUEST;

    switch (error.code) {
      // Unique constraint violation
      case 'P2002':
        statusCode = httpStatus.CONFLICT;
        message = `Duplicate value for this record found. Another record with these values already exists`;
        break;

      // Foreign key constraint violation
      case 'P2003':
        message = `Operation failed due to invalid foreign key reference.`;
        break;

      // Relation constraint violation (attempt to delete a linked record)
      case 'P2014':
        message = `Cannot delete this record because it is linked to another resource.`;
        break;

      // Record not found
      case 'P2025':
        message = `Record not found.`;
        break;

      // Fallback for unhandled Prisma error codes
      default:
        message = 'Database operation failed.';
    }

    // Include Prisma metadata when available for debugging purposes
    errors = error.meta ? [error.meta] : undefined;
  } else if (error instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = 'Validation error';

    // Normalize Zod errors into a simple, client-friendly format
    errors = error.issues.map((e) => ({ path: e.path, error: e.message }));

    // Generic JavaScript errors
  } else if (error instanceof Error) {
    message = error?.message;
  }

  // Send standardized error response to the client
  res.status(statusCode).json({
    success: false,
    message,
    errors,
    // Expose stack trace only in development to avoid leaking internals
    stack: env.app.nodeEnv === 'development' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
