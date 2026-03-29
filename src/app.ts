import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { status as httpStatus } from 'http-status';
import morgan from 'morgan';
import corsConfig from './config/cors';
import env from './config/env';
import globalErrorHandler from './middleware/globalErrorHandler';
import v1Router from './routes/v1';
import ApiError from './utils/apiError';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

//// Main Express app setup

/** Create Express application instance */
const app = express();

// load swagger documentation

// Always resolve relative to project root or build folder
const swaggerDocument = YAML.load(path.join(process.cwd(), 'swagger.yaml'));

// GLOBAL MIDDLEWARE

// Sets various HTTP headers for basic security hardening
app.use(helmet());
// Parse incoming JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// HTTP request logger (development-friendly format)
app.use(morgan('dev'));
// Enable CORS
// In development: allow all origins
// In non-development: use restricted CORS configuration
app.use(cors(env.app.nodeEnv === 'development' ? undefined : corsConfig));

// ROUTES

// Health/sanity check route
app.get('/', (_req, res) => {
  res.send('Hello World');
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Mount versioned API routes
app.use('/api/v1', v1Router);

// ERROR HANDLING

// Handle unknown routes (404)
app.use((req) => {
  throw new ApiError(
    httpStatus.NOT_FOUND,
    `${req.method} ${req.originalUrl} not found`,
  );
});

// Global error handler
app.use(globalErrorHandler);

export default app;
