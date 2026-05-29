import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Clock, Download, Eye, MoreHorizontal, Pencil, Play, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const initialVideos = [
    {
        id: "vid-1",
        title: "Short_ Tiktok_Final_v1.mp4",
        duration: "0:45",
        createdAt: "Ajouté il y a 2h",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: "vid-2",
        title: "Chon_Insta_Export.mp4",
        duration: "1:00",
        createdAt: "Ajouté hier",
        thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: "vid-3",
        title: "Video_Brute_ITW.mov",
        duration: "0:30",
        createdAt: "Ajouté il y a 3 jours",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60",
    },
];

export default function VideoFilesList() {
    const [videos, setVideos] = useState(initialVideos);
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

            {/* ZONE DE DÉPÔT RAPIDE SOUS FORME DE CARTE (AJOUT DE VIDÉO COHÉRENT) */}
            <button className="group aspect-[11/12] flex flex-col items-center justify-center rounded-md border-2 border-dashed border-border hover:border-primary/40 bg-muted/20 hover:bg-card transition-all duration-300 gap-3 cursor-pointer w-full">
                <div className="h-10 w-10 rounded-full bg-card border shadow-sm group-hover:border-primary/30 group-hover:bg-primary/10 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all duration-300">
                    <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    Ajouter une vidéo
                </span>
            </button>

            {/* BOUCLE SUR LES VIDÉOS EXISTANTES */}
            {videos.map((video) => (
                <div
                    key={video.id}
                    className="group relative aspect-[11/12] flex flex-col rounded-md bg-card border hover:border-primary/40 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 cursor-pointer"
                >
                    {/* Zone de la Vignette (Fait ressortir le format vertical) */}
                    <div className="relative flex-1 bg-slate-950 overflow-hidden flex flex-col justify-between">

                        {/* Image de la Vignette */}
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="absolute inset-0 h-full w-full object-cover opacity-75 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                        />

                        {/* Dégradé de lisibilité */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 mix-blend-multiply" />

                        {/* Badge de durée en haut à droite */}
                        <div className="flex justify-end w-full relative z-10 p-3">
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-white tracking-wider border border-white/10">
                                {video.duration}
                            </span>
                        </div>

                        {/* Bouton de Lecture au centre (Apparaît au survol) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <Play className="h-5 w-5 fill-current stroke-[1.5] translate-x-0.5" />
                            </div>
                        </div>

                        {/* Titre et détails incrustés en bas de la vignette */}
                        <div className="relative z-10 space-y-1 p-3">
                            <h3 className="font-medium text-[13px] leading-snug tracking-tight text-white line-clamp-2 drop-shadow-md">
                                {video.title}
                            </h3>
                        </div>
                    </div>

                    {/* Barre d'informations basse */}
                    <div className="h-12 border-top border-border px-3 flex items-center justify-between bg-card relative z-30">
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium select-none">
                            <Clock className="h-3 w-3 opacity-70" />
                            {video.createdAt}
                        </span>

                        {/* Actions de la vidéo */}
                        <div className="relative z-40">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-foreground group-hover:text-slate-900 rounded-md cursor-pointer transition-colors"
                                    >
                                        <MoreHorizontal className="h-4 w-4 stroke-[2]" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-52 p-1.5 bg-popover rounded-md">
                                    <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors focus:bg-muted focus:text-foreground">
                                        <div className="flex items-center gap-2.5">
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                            <span>Ouvrir dans l'éditeur</span>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors focus:bg-muted focus:text-foreground">
                                        <div className="flex items-center gap-2.5">
                                            <Pencil className="h-4 w-4 text-muted-foreground" />
                                            <span>Renommer le fichier</span>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors focus:bg-muted focus:text-foreground">
                                        <div className="flex items-center gap-2.5">
                                            <Download className="h-4 w-4 text-muted-foreground" />
                                            <span>Télécharger la vidéo</span>
                                        </div>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="my-1 bg-border/60" />

                                    <DropdownMenuItem className="flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors text-destructive focus:bg-destructive/10 focus:text-destructive">
                                        <div className="flex items-center gap-2.5">
                                            <Trash2 className="h-4 w-4" />
                                            <span className="font-medium">Supprimer</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}