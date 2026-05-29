"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/lib/api";
import { projectKeys } from "@/lib/projects-querykeys";
import { Project } from "../project-type";

export function useProjects() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const params = useParams();

    const workspaceId = params.workspaceId as string;
    const projectId = params.projectId as string | undefined;

    const baseUrl = `/${workspaceId}/projects`;

    const urls = {
        list: baseUrl,
        create: baseUrl,
        detail: `${baseUrl}/${projectId}`,
        update: `${baseUrl}/${projectId}`,
        delete: `${baseUrl}/${projectId}`,
    };

    const handleError = (error: Error) => {
        toast.error(error.message);
    };

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: projectKeys.list(workspaceId),
        });

        if (projectId) {
            queryClient.invalidateQueries({
                queryKey: projectKeys.detail(workspaceId, projectId),
            });
        }
    };

    // =========================
    // LIST
    // =========================

    const { data: projects, isLoading: projectsLoading } = useQuery({
        queryKey: projectKeys.list(workspaceId),

        queryFn: async () => {
            return api<Project[]>(urls.list);
        },

        enabled: !!workspaceId,
    });

    // =========================
    // DETAIL
    // =========================

    const { data: project, isLoading: projectLoading } = useQuery({
        queryKey: projectKeys.detail(workspaceId, projectId!),

        queryFn: async () => {
            return api<Project>(urls.detail);
        },

        enabled: !!workspaceId && !!projectId,
    });

    // =========================
    // CREATE
    // =========================

    const { mutateAsync: createProject, isPending: isPendingCreateProject } = useMutation({
        mutationFn: async (name: string) => {
            return api<Project>(urls.create, {
                method: "POST",
                body: JSON.stringify({ name }),
            });
        },

        onSuccess: () => {
            toast.success("Projet créé avec succès");
            invalidate();
        },

        onError: handleError,
    });

    // =========================
    // UPDATE
    // =========================

    const { mutateAsync: updateProject, isPending: isPendingUpdateProject } = useMutation({
        mutationFn: async (name: string) => {
            return api<Project>(urls.update, {
                method: "PATCH",
                body: JSON.stringify({ name }),
            });
        },

        onSuccess: () => {
            toast.success("Projet modifié avec succès");
            invalidate();
        },

        onError: handleError,
    });

    // =========================
    // DELETE
    // =========================

    const { mutateAsync: deleteProject, isPending: isPendingDeleteProject } = useMutation({
        mutationFn: async () => {
            return api<Project>(urls.delete, {
                method: "DELETE",
            });
        },

        onSuccess: () => {
            toast.success("Projet supprimé avec succès");
            invalidate();
        },

        onError: handleError,
    });

    return {
        projects: projects || [],
        projectsLoading,

        project,
        projectLoading,

        createProject,
        isPendingCreateProject,

        updateProject,
        isPendingUpdateProject,

        deleteProject,
        isPendingDeleteProject,
    };
}