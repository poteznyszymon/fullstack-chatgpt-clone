import { z } from "zod";

export const registerSchema = z.object({
  displayName: z.string().trim().min(1, { message: "Name cannot be empty" }),
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at lest 6 characters long" }),
});

export type registerValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at lest 6 characters long" }),
});

export type loginValues = z.infer<typeof loginSchema>;
