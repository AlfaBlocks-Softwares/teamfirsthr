import { z } from "zod";

export const loginFormSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
