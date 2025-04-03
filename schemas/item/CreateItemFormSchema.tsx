import { z } from 'zod';

// Zod schema with validations:
// - "name" is required and must be at most 50 characters.
// - "description" is optional.
// - "price" is coerced to a number, must be non-negative, must not exceed 99999.99,
//   and have up to two decimal places.
export const createItemFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  description: z.string().optional(),
  price: z
    .coerce
    .number()
    .nonnegative({ message: "Price must be a positive number" })
    .max(99999.99, { message: "Price must not exceed 99999.99" })
    .refine((val) => {
      const parts = val.toString().split(".");
      return parts.length === 1 || parts[1].length <= 2;
    }, { message: "Price must be in the format 0.00" }),
});

// Infer the TypeScript type from our schema
export type FormInputs = z.infer<typeof createItemFormSchema>;
