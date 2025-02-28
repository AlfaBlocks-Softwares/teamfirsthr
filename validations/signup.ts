import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().email().min(1, "Name is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
