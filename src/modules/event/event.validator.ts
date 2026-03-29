import z from 'zod';

const createEventZodSchema = z.strictObject({
  body: z.strictObject({
    title: z.string().min(5),
    description: z.string().min(10).optional(),
    date: z.coerce.date(),
    totalCapacity: z.number(),
  }),
});

const markEventAttendanceZodSchema = z.strictObject({
  body: z.strictObject({
    code: z.string(),
  }),
});

const eventValidator = {
  createEventZodSchema,
  markEventAttendanceZodSchema,
};

export default eventValidator;
