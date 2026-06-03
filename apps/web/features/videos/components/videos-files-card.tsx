import { Video } from "../types/video-type";
import VideoFilesCardBody from "./video-files-card-body";
import VideoFilesCardFooter from "./video-files-card-footer";

type VideoFilesCardProps = {
    video: Video;
}

export default function VideosFilesCard({ video }: VideoFilesCardProps) {
    return (
        <div className="group relative flex flex-col rounded-xl overflow-hidden w-[280px] h-[320px] border border-border bg-card hover:border-primary/20 hover:shadow-[0_0_0_1px_rgba(var(--primary-rgb),0.1)] transition-all duration-300 cursor-pointer">

            <VideoFilesCardBody video={video} />

            <VideoFilesCardFooter video={video} />
        </div>
    );
}