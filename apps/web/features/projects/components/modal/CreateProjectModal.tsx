"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus, Loader2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createProjectSchema, CreateProjectType } from "@/features/projects/shema/create-project-shema";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { useProjects } from "../../queries/projects-queries";
import { Spinner } from "@/components/ui/spinner";

interface CreateProjectModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    workspaceId: string;

}

export default function CreateProjectModal({ workspaceId, open, setOpen }: CreateProjectModalProps) {

    // 1. Initialisation du formulaire avec React Hook Form & Zod
    const form = useForm<CreateProjectType>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "", // Nettoyé pour démarrer à vide
            workspaceId: workspaceId,
        },
    });

    const { createProject, isPendingCreateProject } = useProjects();

    console.log("isPendingCreateProject", isPendingCreateProject)

    // 2. Gestion de la soumission
    async function onSubmit(data: CreateProjectType) {
        await createProject(data.name);
        form.reset();
        setOpen(false);
    }

    function handleCancel() {
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[480px] px-6 py-6 ">
                <DialogHeader>
                    <DialogTitle className="text-base font-semibold">
                        Créer un nouveau projet
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Donnez un nom à votre projet pour commencer à organiser vos vidéos
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-6">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Entrer le nom du projet"
                                        autoComplete="off"
                                        disabled={isPendingCreateProject}
                                        className="h-10 px-4 focus-visible:ring-0 focus-visible:border-primary focus-visible:border-1 transition-all text-base"
                                    />
                                    {fieldState.invalid && fieldState.error?.message && (
                                        <FieldError className="text-sm font-medium text-red-500 mt-2">
                                            {fieldState.error.message}
                                        </FieldError>
                                    )}
                                </Field>
                            )}
                        />
                    </div>

                    <div className="flex  sm:flex-row sm:justify-between  pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPendingCreateProject}
                            onClick={handleCancel}
                            className="cursor-pointer"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPendingCreateProject}
                            className="cursor-pointer min-w-[100px]"
                        >
                            {isPendingCreateProject && <Spinner />}
                            Créer
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}