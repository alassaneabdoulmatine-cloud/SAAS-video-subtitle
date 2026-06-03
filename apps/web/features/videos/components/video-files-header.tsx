"use client";

import { ArrowLeft, Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoFilesHeader() {
    return (
        <div>

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

            </div >
        </div>
    )
}