import { z } from "zod";

export const createVideoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    url: z.string().min(1, "Invalid URL"),
    projectId: z.string(),
})

export type createVideoType = z.infer<typeof createVideoSchema>