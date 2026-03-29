import prisma from '@/config/prisma';
import { Prisma } from '@/generated/prisma/client';
import ApiError from '@/utils/apiError';
import calculatePagination, { PaginationOptions } from '@/utils/pagination';
import { status as httpStatus } from 'http-status';

const createEvent = async (data: Prisma.EventCreateInput) => {
  return prisma.event.create({
    data: {
      ...data,
      remainingTickets: data.totalCapacity,
    },
  });
};

const getPaginatedUpcomingEvents = async (
  filters: {
    search?: string;
  },
  options: PaginationOptions,
) => {
  const { search, ...filterData } = filters;
  const {
    limit: take,
    skip,
    page,
    sortBy,
    sortOrder,
  } = calculatePagination(options);

  const conditions: Prisma.EventWhereInput[] = [];

  // Filter only upcoming events
  conditions.push({
    date: { gte: new Date() },
  });

  if (search) {
    conditions.push({
      OR: ['title', 'description'].map((field) => ({
        [field]: {
          contains: search,
        },
      })),
    });
  }

  // exact match
  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key as keyof typeof filterData],
        },
      })),
    });
  }

  const whereConditions = conditions.length ? { AND: conditions } : {};

  const [result, total] = await Promise.all([
    await prisma.event.findMany({
      where: whereConditions,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
    }),

    await prisma.event.count({
      where: whereConditions,
    }),
  ]);

  return {
    meta: { total, page, limit: take },
    data: result,
  };
};

const markEventAttendance = async (eventId: number, code: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      code,
    },
    include: {
      event: true,
    },
  });

  if (!booking || booking.eventId !== eventId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not exist.');
  }
  const event = booking.event;
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event does not exist.');
  }
  if (new Date() < event?.date) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Event has not started yet');
  }

  // schema assumes one ticket per booking
  const existingAttendance = await prisma.eventAttendance.findUnique({
    where: {
      userId_eventId: {
        userId: booking.userId,
        eventId,
      },
    },
  });

  if (existingAttendance) {
    return {
      attendanceId: existingAttendance.id,
      userId: booking.userId,
      eventId,
      ticketsBooked: 1,
      entryTime: existingAttendance.entryTime,
    };
  }

  try {
    const attendance = await prisma.eventAttendance.create({
      data: {
        userId: booking.userId,
        eventId,
      },
    });

    return {
      attendanceId: attendance.id,
      userId: booking.userId,
      eventId,
      ticketsBooked: 1,
      entryTime: attendance.entryTime,
    };
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ApiError(409, 'Attendance already recorded for this event.');
    }
    throw error;
  }
};

const eventService = {
  createEvent,
  getPaginatedUpcomingEvents,
  markEventAttendance,
};

export default eventService;
