import catchAsync from '@/utils/catchAsync';
import { status as httpStatus } from 'http-status';
import pick from '@/utils/pick';
import eventService from './event.service';
import ApiError from '@/utils/apiError';

const createEventHandler = catchAsync(async (req, res) => {
  const data = req.body;

  const response = await eventService.createEvent(data);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Event created successfully.',
    data: response,
  });
});

const getPaginatedUpcomingEventsHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['search']);
  const options = pick(req.query, ['sort_by', 'sort_order', 'limit', 'page']);
  const response = await eventService.getPaginatedUpcomingEvents(
    filters,
    options,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Upcoming events fetched successfully.',
    data: response,
  });
});

const markEventAttendanceHandler = catchAsync(async (req, res) => {
  const eventId = Number(req.params.id);
  const { code } = req.body;
  if (isNaN(eventId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid event ID.');
  }
  const response = await eventService.markEventAttendance(eventId, code);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Event attendance marked successfully.',
    data: response,
  });
});

const eventController = {
  createEventHandler,
  getPaginatedUpcomingEventsHandler,
  markEventAttendanceHandler,
};

export default eventController;
