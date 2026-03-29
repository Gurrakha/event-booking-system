import z from 'zod';

const createBookingZodSchema = z.strictObject({
  body: z.strictObject({
    userId: z.coerce.number(),
    eventId: z.coerce.number(),
  }),
});

const bookingValidator = {
  createBookingZodSchema,
};

export default bookingValidator;
