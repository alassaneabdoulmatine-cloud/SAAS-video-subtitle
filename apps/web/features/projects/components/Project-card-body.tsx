"use client";
import { Workspace } from "@/features/workspaces/types/workspace-type";
import { Bell, Folder, Video } from "lucide-react";
import { Project } from "../types/project-type";
import { useParams, useRouter } from "next/navigation";
type projectCardBodyProps = {
    project: Project;
    workspace: Workspace | undefined;
}

export default function ProjectCardBody({ project, workspace }: projectCardBodyProps) {
    const { workspaceId } = useParams();
    const router = useRouter();

    function handleRedirctToProject() {
        router.push(`/${workspaceId}/project/${project.id}/videos`);
    }
    return (
        <div className="relative flex-1 bg-slate-950 overflow-hidden p-4 flex flex-col justify-between cursor-pointer" onClick={handleRedirctToProject}>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex justify-end w-full relative z-10">
                <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-primary transition-colors">
                    <Bell className="h-3.5 w-3.5" />
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300">
                <Video className="h-12 w-12 text-white stroke-[1.2]" />
            </div>

            <div className="relative z-10 space-y-1">
                <h3 className="font-medium text-[14px] leading-snug tracking-tight text-white line-clamp-2">
                    {project.name}
                </h3>
                <p className="text-[11px] text-white/40 font-normal tracking-wide flex items-center gap-1">
                    <Folder className="h-3 w-3 opacity-60 text-primary" />
                    {workspace?.name}
                </p>
            </div>
        </div>
    )
}