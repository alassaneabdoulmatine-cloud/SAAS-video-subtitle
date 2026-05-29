"use client"

import { useState } from "react";
import {
    Plus,
    ArrowLeft,
    SlidersHorizontal,

} from "lucide-react";
import { Button } from "@/components/ui/button";

import VideoFilesList from "./VideoFilesList";
import EmptyProjectState from "./EmptyProjectState";



export default function ProjectDetailsPage() {
    // Bascule cet état à "false" pour tester l'état Empty (sans vidéo)
    const [hasVideos, setHasVideos] = useState(true);

    return (
        <div className="min-h-screen text-foreground bg-background">
            <div className="max-w-[1600px] mx-auto space-y-8 p-8">

                {/* ================= FIL D'ARIANE / RETOUR ================= */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors w-fit group">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    <span>Retour aux projets</span>
                </div>

                {/* ================= HEADER DU PROJET ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Untitled Project
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Espace de travail : <span className="text-foreground font-medium">Matinou's Workspace</span>
                        </p>
                    </div>

                    {/* Actions du header visibles uniquement s'il y a des vidéos */}
                    {hasVideos && (
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" className="h-9 gap-2 cursor-pointer">
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                Filtrer
                            </Button>
                            <Button size="sm" className="h-9 bg-primary text-primary-foreground hover:opacity-95 font-semibold gap-2 px-4 transition-all cursor-pointer">
                                <Plus className="h-4 w-4 stroke-[2.5]" />
                                Importer une vidéo
                            </Button>
                        </div>
                    )}
                </div>

                {/* ================= RENDU DYNAMIQUE DES ÉTATS ================= */}
                {hasVideos ? (
                    <VideoFilesList />
                ) : (
                    <EmptyProjectState />
                )}

            </div>
        </div>
    );
}

