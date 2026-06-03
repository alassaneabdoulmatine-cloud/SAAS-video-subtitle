import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Clock, Download, Eye, MoreHorizontal, Pencil, Play, Plus, Trash2 } from "lucide-react";
import { Video } from "../types/video-type";
import VideoFilesHeader from "./video-files-header";
import VideosFilesCard from "./videos-files-card";


type VideoFilesListProps = {
    videos: Video[];
};

export default function VideoFilesList({ videos }: VideoFilesListProps) {
    return (
        <div className="flex w-full h-full flex-col gap-12">
            <div className="h-12">
                <VideoFilesHeader />
            </div>

            {/* BOUCLE SUR LES VIDÉOS EXISTANTES */}
            <div className="flex gap-5 w-full h-full">{videos.map((video) => (
                <VideosFilesCard key={video.id} video={video} />
            ))}</div>

        </div>
    );
}