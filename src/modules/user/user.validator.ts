import z from 'zod';

const createUserZodSchema = z.strictObject({
  body: z.strictObject({
    name: z.string().min(2),
    email: z.email(),
  }),
});

const userValidator = {
  createUserZodSchema,
};

export default userValidator;
