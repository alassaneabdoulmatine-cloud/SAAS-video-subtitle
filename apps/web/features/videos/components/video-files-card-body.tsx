import { Play } from "lucide-react";
import { Video } from "../types/video-type";

type VideoFilesCardBodyProps = {
    video: Video;
}

export default function VideoFilesCardBody({ video }: VideoFilesCardBodyProps) {
    return (

        <div className="relative flex-1 bg-slate-950 overflow-hidden flex flex-col justify-between h-full w-full">

            {/* Image de la Vignette */}
            <img
                src={video.url}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover opacity-75 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
            />

            {/* Dégradé de lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 mix-blend-multiply" />

            {/* Badge de durée en haut à droite */}
            <div className="flex justify-end w-full relative z-10 p-3">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-white tracking-wider border border-white/10">
                    {video.createdAt}
                </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="h-5 w-5 fill-current stroke-[1.5] translate-x-0.5" />
                </div>
            </div>

            <div className="relative z-10 space-y-1 p-3">
                <h3 className="font-medium text-[13px] leading-snug tracking-tight text-white line-clamp-2 drop-shadow-md">
                    {video.title}
                </h3>
            </div>
        </div>
    );
}