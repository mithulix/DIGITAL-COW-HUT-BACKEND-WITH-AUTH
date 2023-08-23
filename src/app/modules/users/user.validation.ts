import { z } from 'zod';
import { userRole } from './user.constant';

const createUserZodValidateSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string({ required_error: 'Password is required!' }),
    phoneNumber: z.string({ required_error: 'Phone number is required!' }),
    address: z.string({ required_error: 'Address is required!' }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const updateZodValidateSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    role: z.enum([...userRole] as [string, ...string[]], {}).optional(),
    password: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidationSchema = {
  createUserZodValidateSchema,
  updateZodValidateSchema,
};
