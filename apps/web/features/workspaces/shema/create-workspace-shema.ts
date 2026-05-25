import zod from "zod";

export const createWorkspaceShema = zod.object({
    name: zod.string("Le nom doit être une chaine de caracteres")
        .min(3, "Le nom doit contenir au moins 3 caracteres")
        .max(50, "Le nom doit contenir au plus 50 caracteres")
        .nonempty("Veuillez entrer un nom pour votre espace de travail"),
});

export type CreateWorkspaceShema = zod.infer<typeof createWorkspaceShema>;