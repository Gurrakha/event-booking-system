import prisma from '@/config/prisma';
import { Prisma } from '@/generated/prisma/client';
import ApiError from '@/utils/apiError';
import calculatePagination, { PaginationOptions } from '@/utils/pagination';
import { status as httpStatus } from 'http-status';

const createUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({
    data,
  });
};

const getPaginatedUsers = async (
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

  const conditions: Prisma.UserWhereInput[] = [];

  if (search) {
    conditions.push({
      OR: ['name', 'email'].map((field) => ({
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
    await prisma.user.findMany({
      where: whereConditions,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
    }),

    await prisma.user.count({
      where: whereConditions,
    }),
  ]);

  return {
    meta: { total, page, limit: take },
    data: result,
  };
};

const getPaginatedUserBookings = async (
  userId: number,
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

  const conditions: Prisma.BookingWhereInput[] = [];

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');
  }

  // fetch only this user's bookings
  conditions.push({
    userId,
  });

  if (search) {
    conditions.push({
      event: {
        OR: ['title', 'description'].map((field) => ({
          [field]: {
            contains: search,
          },
        })),
      },
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
    await prisma.booking.findMany({
      where: whereConditions,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
      include: {
        event: {
          // including additional event details
          select: {
            title: true,
            description: true,
            date: true,
          },
        },
      },
    }),

    await prisma.booking.count({
      where: whereConditions,
    }),
  ]);

  return {
    meta: { total, page, limit: take },
    data: result,
  };
};

const userService = {
  createUser,
  getPaginatedUsers,
  getPaginatedUserBookings,
};

export default userService;
