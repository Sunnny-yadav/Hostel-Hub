import { z } from "zod";

export const raiseComplaintSchema = z.object({
  Title: z.string().trim().min(1, { message: "Title is required" }),

  Description: z.string().trim().min(1, { message: "Description is requried" }),

  Type: z.enum(["personal", "public"], {
    errorMap: (issues, ctx) => ({
      message: `${ctx.data} not belongs to 'personal' or 'public'`,
    }),
  }),
  
});
