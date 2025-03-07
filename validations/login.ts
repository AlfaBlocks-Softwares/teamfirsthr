import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => value, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SetUpPasswordSchema = z.infer<typeof passwordSchema>;
