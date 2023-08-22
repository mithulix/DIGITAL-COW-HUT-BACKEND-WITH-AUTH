import { z } from 'zod';
import {
  cowBreeds,
  cowCategories,
  cowLabels,
  cowLocations,
} from './cow.constant';

const createCowZodValidateSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    age: z.number({
      required_error: 'age is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    location: z.enum([...cowLocations] as [string, ...string[]], {
      required_error: 'location is required',
    }),
    breed: z.enum([...cowBreeds] as [string, ...string[]], {
      required_error: 'breed is required',
    }),
    weight: z.number({
      required_error: 'weight is required',
    }),
    label: z.enum([...cowLabels] as [string, ...string[]], {
      required_error: 'label is required',
    }),
    category: z.enum([...cowCategories] as [string, ...string[]], {
      required_error: 'category is required',
    }),
    seller: z.string({
      required_error: 'seller is required',
    }),
  }),
});

const updateCowZodValidateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...cowLocations] as [string, ...string[]]).optional(),
    breed: z.enum([...cowBreeds] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...cowLabels] as [string, ...string[]]).optional(),
    category: z.enum([...cowCategories] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidationSchema = {
  createCowZodValidateSchema,
  updateCowZodValidateSchema,
};