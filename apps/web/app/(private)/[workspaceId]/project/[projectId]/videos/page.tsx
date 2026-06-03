"use client"

import { useState } from "react";
import {
    Plus,
    ArrowLeft,
    SlidersHorizontal,

} from "lucide-react";
import { Button } from "@/components/ui/button";

import VideoFilesList from "../../../../../../features/videos/components/VideoFilesList";
import EmptyProjectState from "../../../../../../features/videos/components/EmptyProjectState";
import { useParams, usePathname } from "next/navigation";
import { useVideos } from "@/features/videos/queries/videos-queries";

const initialVideos = [
    {
        id: "vid-1",
        title: "Short_ Tiktok_Final_v1.mp4",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",

    },
    {
        id: "vid-2",
        title: "Chon_Insta_Export.mp4",
        url: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&auto=format&fit=crop&q=60",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",

    },
    {
        id: "vid-3",
        title: "Video_Brute_ITW.mov",
        url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60",
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",

    },
];

export default function ProjectDetailsPage() {
    // Bascule cet état à "false" pour tester l'état Empty (sans vidéo)
    const { videos, videosLoading } = useVideos()

    if (videosLoading) return <div>Loading...</div>
    return (
        <div className="min-h-screen text-foreground bg-background">


            {videos.length > 0 ? (
                <VideoFilesList videos={videos} />
            ) : (
                <EmptyProjectState />
            )}

        </div>
    );
}

