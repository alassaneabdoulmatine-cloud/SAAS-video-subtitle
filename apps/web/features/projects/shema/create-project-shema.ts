import * as z from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Le nom du projet doit contenir au moins 3 caractères." })
        .max(50, { message: "Le nom du projet ne doit pas dépasser 50 caractères." }),
    workspaceId: z.string().min(1, { message: "Le workspace est requis." }),
});

export type CreateProjectType = z.infer<typeof createProjectSchema>;