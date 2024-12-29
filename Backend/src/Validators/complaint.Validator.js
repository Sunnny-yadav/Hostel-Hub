import { z } from "zod";

export const raiseComplaintSchema = z.object({
  Title: z.string().trim().min(1, { message: "Title is required" }),
  Type: z.enum(["personal", "public"], {
    errorMap: (issues, ctx) => ({
      message: `Select the Type`,
    }),
  }),
  Description: z.string().trim().min(1, { message: "Description is requried" }),

  
});
