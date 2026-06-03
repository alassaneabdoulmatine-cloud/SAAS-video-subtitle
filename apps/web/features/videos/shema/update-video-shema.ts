import { z } from "zod";

export const updateVideoSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    url: z.url("Invalid URL").optional(),
})

export type updateVideoType = z.infer<typeof updateVideoSchema>