"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud, FileVideo } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useVideos } from "../queries/videos-queries";


export default function EmptyProjectState() {
    const projectId = useParams().projectId as string;
    const { createVideo, isPendingCreateVideo } = useVideos()
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            const formData = new FormData();
            formData.append("file", acceptedFiles[0]);

            const response = await fetch('http://localhost:3001/uploadfile', {
                method: 'POST',
                body: formData,
            })
            const data = await response.json();
            console.log(data)
            // C'est ici que tu appelleras ta fonction d'upload vers ton backend ou Supabase
            // createVideo({ title: acceptedFiles[0].name, description: acceptedFiles[0].name, url: acceptedFiles[0].webkitRelativePath || acceptedFiles[0].name, projectId: projectId })
            console.log("Fichier prêt pour l'intégration :", acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'video/*': [] }, // Accepte uniquement les fichiers vidéo
        maxFiles: 1
    });

    console.log("file", file)

    return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)] p-10">

            {/* Zone Dropzone interactive globale */}
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center h-full w-full  rounded-xl border-2 border-dashed p-12 text-center transition-all cursor-pointer group
                    ${isDragActive
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : "border-border bg-muted/10 hover:bg-muted/20 hover:border-primary/30"
                    }`}
            >
                {/* Input invisible requis par react-dropzone */}
                <input {...getInputProps()} />

                {/* Icône Dynamique (Change si un fichier est sélectionné) */}
                <div className="h-16 w-16 rounded-full bg-card border flex items-center justify-center text-muted-foreground mb-4 shadow-sm group-hover:scale-105 group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
                    {file ? (
                        <FileVideo className="h-7 w-7 text-primary animate-pulse" />
                    ) : (
                        <UploadCloud className="h-7 w-7 stroke-[1.5]" />
                    )}
                </div>

                {/* Textes informatifs */}
                <div className="max-w-md space-y-2 pointer-events-none">
                    <h2 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                        {file ? "Fichier sélectionné avec succès" : "Importez votre première vidéo"}
                    </h2>
                    <p className="text-sm text-muted-foreground px-6">
                        {file ? (
                            <span className="font-medium text-foreground block truncate max-w-sm mx-auto">
                                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} Mo)
                            </span>
                        ) : (
                            "Ce projet est vide. Glissez-déposez votre fichier vidéo ici. Formats acceptés : MP4, MOV — Taille max : 500 Mo"
                        )}
                    </p>
                </div>

                {/* Bouton d'action au centre */}
                <div className="mt-6">
                    <Button
                        type="button"
                        className="pointer-events-none font-semibold p-4 shadow-sm"
                    >
                        {file ? "Changer de fichier" : "Importer une vidéo"}
                    </Button>
                </div>
            </div>
        </div>
    );
}