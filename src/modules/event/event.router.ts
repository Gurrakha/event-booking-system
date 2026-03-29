import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import eventValidator from './event.validator';
import eventController from './event.controller';

const eventRouter = Router();

eventRouter
  .route('/')
  .post(
    validateRequest(eventValidator.createEventZodSchema),
    eventController.createEventHandler,
  )
  .get(eventController.getPaginatedUpcomingEventsHandler);

eventRouter
  .route('/:id/attendance')
  .post(
    validateRequest(eventValidator.markEventAttendanceZodSchema),
    eventController.markEventAttendanceHandler,
  );

export default eventRouter;
