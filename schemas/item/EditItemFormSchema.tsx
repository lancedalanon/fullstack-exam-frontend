import { z } from 'zod';

// Schema for editing an item:
// - "name" is required (max 50 characters).
// - "description" is optional.
// - "price" is coerced to a number, must be non-negative, not exceed 99999.99, and have up to two decimals.
export const editItemFormSchema = z.object({
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

// Infer the type for the editable item form inputs
export type EditableItemFormInputs = z.infer<typeof editItemFormSchema>;
