import catchAsync from '@/utils/catchAsync';
import { status as httpStatus } from 'http-status';
import bookingService from './booking.service';

const createBookingHandler = catchAsync(async (req, res) => {
  const data = req.body;

  const response = await bookingService.createBooking(data);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Booking created successfully.',
    data: response,
  });
});

const bookingController = {
  createBookingHandler,
};

export default bookingController;
