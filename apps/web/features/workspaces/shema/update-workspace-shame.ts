import zod from "zod";
import { createWorkspaceShema } from "./create-workspace-shema";

export const updateWorkspaceShema = createWorkspaceShema.extend({
    name: zod.string("Le nom doit être une chaine de caracteres")
        .min(3, "Le nom doit contenir au moins 3 caracteres")
        .max(50, "Le nom doit contenir au plus 50 caracteres")
        .nonempty("Veuillez entrer un nom pour votre espace de travail"),
});

export type UpdateWorkspaceShema = zod.infer<typeof updateWorkspaceShema>;