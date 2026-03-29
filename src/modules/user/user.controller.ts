import catchAsync from '@/utils/catchAsync';
import userService from './user.service';
import { status as httpStatus } from 'http-status';
import pick from '@/utils/pick';
import ApiError from '@/utils/apiError';

const createUserHandler = catchAsync(async (req, res) => {
  const data = req.body;

  const response = await userService.createUser(data);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User created successfully.',
    data: response,
  });
});

const getPaginatedUsersHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['search']);
  const options = pick(req.query, ['sort_by', 'sort_order', 'limit', 'page']);
  const response = await userService.getPaginatedUsers(filters, options);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Users fetched successfully.',
    data: response,
  });
});

const getPaginatedUserBookingsHandler = catchAsync(async (req, res) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user ID');
  }
  const filters = pick(req.query, ['search']);
  const options = pick(req.query, ['sort_by', 'sort_order', 'limit', 'page']);
  const response = await userService.getPaginatedUserBookings(
    userId,
    filters,
    options,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'User bookings fetched successfully.',
    data: response,
  });
});
const userController = {
  createUserHandler,
  getPaginatedUsersHandler,
  getPaginatedUserBookingsHandler,
};
export default userController;
