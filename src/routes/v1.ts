import bookingRouter from '@/modules/booking/booking.router';
import eventRouter from '@/modules/event/event.router';
import userRouter from '@/modules/user/user.router';
import { Router } from 'express';

const v1Router = Router();

const routes: {
  path: string;
  router: Router;
}[] = [
  { path: '/users', router: userRouter },
  { path: '/events', router: eventRouter },
  { path: '/bookings', router: bookingRouter },
];

routes.forEach((route) => v1Router.use(route.path, route.router));

export default v1Router;
