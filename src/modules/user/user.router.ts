import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import userValidator from './user.validator';
import userController from './user.controller';

const userRouter = Router();

userRouter
  .route('/')
  .post(
    validateRequest(userValidator.createUserZodSchema),
    userController.createUserHandler,
  )
  .get(userController.getPaginatedUsersHandler);

userRouter
  .route('/:id/bookings')
  .get(userController.getPaginatedUserBookingsHandler);

export default userRouter;
