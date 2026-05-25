"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { workspaceKeys } from "@/lib/queryKeys";

export function useWorkspace() {
    const router = useRouter();
    const params = useParams();
    const workspaceId = params.workspaceId as string;

    const queryClient = useQueryClient();

    // 🔁 invalidation helper propre
    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
        if (workspaceId) {
            queryClient.invalidateQueries({
                queryKey: workspaceKeys.detail(workspaceId),
            });
        }
    };

    // 🟢 CREATE
    const { mutateAsync: createWorkspace, isPending: isCreating } = useMutation({
        mutationFn: async (name: string) => {
            return api("/workspace", {
                method: "POST",
                body: JSON.stringify({ name }),
            });
        },
        onSuccess: () => {
            toast.success("Espace de travail créé avec succès");
            invalidate();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    // 🟢 LIST
    const { data: workspaces, isLoading } = useQuery({
        queryKey: workspaceKeys.all,
        queryFn: () => api("/workspace"),
    });

    // 🟢 SINGLE WORKSPACE
    const { data: workspace, isLoading: workspaceLoading } = useQuery({
        queryKey: workspaceKeys.detail(workspaceId),
        queryFn: () => api(`/workspace/${workspaceId}`),
        enabled: !!workspaceId,
    });

    // 🟡 UPDATE
    const { mutateAsync: updateWorkspace, isPending: isUpdating } = useMutation({
        mutationFn: async (name: string) => {
            return api(`/workspace/${workspaceId}`, {
                method: "PATCH",
                body: JSON.stringify({ name }),
            });
        },
        onSuccess: () => {
            toast.success("Espace de travail modifié avec succès");
            invalidate();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    // 🔴 DELETE
    const { mutateAsync: deleteWorkspace, isPending: isDeleting } = useMutation({
        mutationFn: async () => {
            return api(`/workspace/${workspaceId}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            toast.success("Espace de travail supprimé avec succès");
            invalidate();
            router.push("/home");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    return {
        createWorkspace,
        isCreating,

        workspaces,
        isLoading,

        workspace,
        workspaceLoading,

        updateWorkspace,
        isUpdating,

        deleteWorkspace,
        isDeleting,
    };
}