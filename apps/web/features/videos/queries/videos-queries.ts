"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/lib/api";
import { videoKeys } from "@/lib/videos-querykeys";
import { Video } from "../types/video-type";
import { createVideoType } from "../shema/create-video-shema";
import { updateVideoType } from "../shema/update-video-shema";

export function useVideos(videoId?: string) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const params = useParams();

    const { workspaceId, projectId } = params as { workspaceId: string; projectId: string };

    const baseUrl = `/${workspaceId}/projects/${projectId}/videos`;

    const urls = {
        list: baseUrl,
        create: baseUrl,
        detail: `${baseUrl}/${videoId}`,
        update: `${baseUrl}/${videoId}`,
        delete: `${baseUrl}/${videoId}`,
    };

    const handleError = (error: Error) => {
        toast.error(error.message);
    };

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: videoKeys.list(workspaceId, projectId),
        });

        if (videoId) {
            queryClient.invalidateQueries({
                queryKey: videoKeys.detail(workspaceId, projectId, videoId),
            });
        }
    };

    // =========================
    // LIST
    // =========================

    const { data: videos, isLoading: videosLoading } = useQuery({
        queryKey: videoKeys.list(workspaceId, projectId),

        queryFn: async () => {
            return api<Video[]>(urls.list);
        },

        enabled: !!workspaceId,
    });

    // =========================
    // DETAIL
    // =========================

    const { data: video, isLoading: videoLoading } = useQuery({
        queryKey: videoKeys.detail(workspaceId, projectId, videoId!),

        queryFn: async () => {
            return api<Video>(urls.detail);
        },

        enabled: !!workspaceId && !!projectId && !!videoId,
    });

    // =========================
    // CREATE
    // =========================

    const { mutateAsync: createVideo, isPending: isPendingCreateVideo } = useMutation({
        mutationFn: async (createVideoData: createVideoType) => {
            return api<Video>(urls.create, {
                method: "POST",
                body: JSON.stringify(createVideoData),
            });
        },

        onSuccess: () => {
            toast.success("Vidéo créé avec succès");
            invalidate();
        },

        onError: handleError,
    });

    // =========================
    // UPDATE
    // =========================

    const { mutateAsync: updateVideo, isPending: isPendingUpdateVideo } = useMutation({
        mutationFn: async (updateVideoData: updateVideoType) => {
            return api<Video>(urls.update, {
                method: "PATCH",
                body: JSON.stringify(updateVideoData),
            });
        },

        onSuccess: () => {
            toast.success("Vidéo modifié avec succès");
            invalidate();
        },

        onError: handleError,
    });

    // =========================
    // DELETE
    // =========================

    const { mutateAsync: deleteVideo, isPending: isPendingDeleteVideo } = useMutation({
        mutationFn: async () => {
            return api<Video>(urls.delete, {
                method: "DELETE",
            });
        },

        onSuccess: () => {
            toast.success("Vidéo supprimé avec succès");
            invalidate();
        },

        onError: handleError,
    });

    return {
        videos: videos || [],
        videosLoading,

        video,
        videoLoading,

        createVideo,
        isPendingCreateVideo,

        updateVideo,
        isPendingUpdateVideo,

        deleteVideo,
        isPendingDeleteVideo,
    };
}