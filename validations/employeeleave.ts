import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;

export const employeeLeaveFormSchema = z
  .object({
    reason: z.string().min(1, "Reason is required"),
    type: z.string().min(1, "Reason is required"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Start Date must be a valid date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "End Date must be a valid date",
    }),
    files: z
      .array(
        z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
          message: "Each file must be less than 10MB",
        })
      )
      .max(MAX_FILES, `You can upload up to ${MAX_FILES} files`)
      .optional(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End Date must be after Start Date",
    path: ["endDate"],
  });

export type EmployeeLeaveFormSchema = z.infer<typeof employeeLeaveFormSchema>;
