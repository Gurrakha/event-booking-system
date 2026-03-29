import prisma from '@/config/prisma';
import { CreateBooking } from '@/types/booking.types';
import ApiError from '@/utils/apiError';
import { randomUUID } from 'crypto';
import { status as httpStatus } from 'http-status';

const createBooking = async (data: CreateBooking) => {
  return prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({
      where: {
        id: data.eventId,
      },
    });
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event does not exist.');
    }
    if (event.remainingTickets <= 0) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'All tickets to this event have been booked.',
      );
    }
    const user = await tx.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');
    }

    const booking = await tx.booking.create({
      data: {
        userId: data.userId,
        eventId: data.eventId,
        code: randomUUID(),
      },
    });

    await tx.event.update({
      where: {
        id: event?.id,
      },
      data: {
        remainingTickets: {
          decrement: 1,
        },
      },
    });

    return booking;
  });
};

const bookingService = {
  createBooking,
};

export default bookingService;
