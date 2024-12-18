import { z } from "zod";

export const RegistrationSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, { message: "Fullname is required" }),

    email: z.string().trim().email({ message: "Invalid email format" }),

    password: z.string().trim().min(1, { message: "Password is required" }),

    gender: z.enum(["M", "F", "O"], {
      errorMap: (issue, ctx) => ({
        message: `${ctx.data} is not supported. Please choose 'M', 'F', or 'O'.`,
      }),
    }),

    phone: z
      .string()
      .trim()
      .regex(/^[1-9][0-9]{9}$/, {
        message: "Phone number must be 10 digits and cannot start with 0.",
      }),

    role: z.enum(["student", "warden"], {
      errorMap: (issue, ctx) => ({
        message: `${ctx.data} is not a valid role. Choose either 'student' or 'warden'.`,
      }),
    }),

   

    branchName: z.string().toLowerCase().trim().optional(),

    currentYear: z.string().optional(),

    roomNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "student") {
      if (!data.branchName) {
        ctx.addIssue({
          path: ["branchName"],
          message: "Branch name is required for students.",
        });
      }
      if (data.currentYear === undefined) {
        ctx.addIssue({
          path: ["currentYear"],
          message: "Current year is required for students.",
        });
      }
      if (!data.roomNumber) {
        ctx.addIssue({
          path: ["roomNumber"],
          message: "Room number is required for students.",
        });
      }
    }
  });
