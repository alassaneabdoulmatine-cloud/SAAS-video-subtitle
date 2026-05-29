"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateProjectModal from "@/features/projects/components/modal/CreateProjectModal";
import { useState } from "react";
import { useParams } from "next/navigation";
import VideoProjectCard from "./project-card";
import { useProjects } from "@/features/projects/queries/projects-queries";

export default function VideoFoldersWhite() {

    const { projects, projectsLoading } = useProjects();
    const [open, setOpen] = useState(false);
    const { workspaceId } = useParams();

    function handleOpenCreateProject() {
        setOpen(true);
    }

    return (
        /* Ici, on force h-full et overflow-y-auto. 
          Si un parent bloque le scroll de la page, ce conteneur gérera son propre scroll de manière autonome.
        */
        <div className="w-full h-full min-h-screen  text-foreground flex flex-col bg-background">

            {/* Le conteneur principal */}
            <div className="max-w-[1600px] w-full mx-auto flex flex-col p-8 space-y-8">

                {/* ================= HEADER DE LA PAGE ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 flex-shrink-0">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl font-bold tracking-tight">
                                Vos projets
                            </h1>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-semibold bg-muted border text-muted-foreground">
                                {projects?.length || 0}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Gerez et editez vos videos verticales avec sous-titres IA.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="h-9 gap-2 cursor-pointer">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            Filtrer
                        </Button>
                        <Button size="sm" className="h-9 bg-primary text-primary-foreground hover:opacity-95 font-semibold gap-2 px-4 transition-all cursor-pointer" onClick={handleOpenCreateProject}>
                            <Plus className="h-4 w-4 stroke-[2.5]" />
                            Nouveau projet
                        </Button>
                    </div>
                </div>

                {/* ================= ZONE DES PROJETS ================= */}
                <div className="pb-12">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">

                        {/* BOUCLE SUR LES PROJETS EXISTANTS */}
                        {projects?.map((project) => (
                            <div key={project.id}>
                                <VideoProjectCard project={project} />
                            </div>
                        ))}

                        {/* CARTE BOUTON "NOUVEAU PROJET" */}
                        <button className="group aspect-[11/12] flex flex-col items-center justify-center rounded-md border-2 border-dashed border-border hover:border-primary/40 bg-muted/20 hover:bg-card transition-all duration-300 gap-3 cursor-pointer w-full" onClick={handleOpenCreateProject}>
                            <div className="h-10 w-10 rounded-full bg-card border shadow-sm group-hover:border-primary/30 group-hover:bg-primary/10 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all duration-300">
                                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                                Nouveau projet
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* modal of project creation */}
            <CreateProjectModal open={open} setOpen={setOpen} workspaceId={workspaceId as string} />

        </div>
    );
}