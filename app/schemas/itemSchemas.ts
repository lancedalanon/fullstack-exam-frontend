import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .regex(/^\d{1,5}(\.\d{1,2})?$/, "Price can only be from 0 to 99999.99")
    .refine((val) => parseFloat(val) >= 0, "Price must be greater than or equal to 0")
    .refine(
      (val) => parseFloat(val) <= 99999.99,
      "Price must be less than or equal to 99999.99"
    ),
});

export const outputSchema = formSchema.transform((data) => ({
  ...data,
  price: parseFloat(data.price),
}));

export type FormInputs = z.infer<typeof formSchema>;
export type FormOutputs = z.infer<typeof outputSchema>;
