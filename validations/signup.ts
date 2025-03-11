import * as z from "zod";

export const signUpFormSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email format"),
  position: z.string().min(2, "Position is required"),
  department: z.string(),
  role: z.string(),
  company: z.string().min(2, "Company name is required"),
  marital_status: z.string(),
  gender: z.string(),
  date_of_birth: z.date(),
  phone_number: z.string().refine((value) => value, "Phone number is required"),
  salary: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Salary must be a number"),
  address: z.string().min(5, "Address is required"),
  employment_status: z.string(),
  date_joined: z.date(),
  manager: z.string().optional(),
  emergency_name: z.string().min(2, "Emergency contact name is required"),
  emergency_phone: z
    .string()
    .refine((value) => value, "Phone number is required"),
  emergency_contact: z.string().min(2, "Emergency contact relation required"),
});
