import {z} from 'zod'

export const commentSchema = z.object({
    text:z.string().min(1,{message:"message box is empty"})
});

