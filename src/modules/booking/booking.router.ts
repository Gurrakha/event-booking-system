import { Router } from 'express';
import bookingValidator from './booking.validator';
import validateRequest from '@/middleware/validateRequest';
import bookingController from './booking.controller';

const bookingRouter = Router();

bookingRouter
  .route('/')
  .post(
    validateRequest(bookingValidator.createBookingZodSchema),
    bookingController.createBookingHandler,
  );

export default bookingRouter;
