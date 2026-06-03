"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud, FileVideo } from "lucide-react";
import { useCallback, useState } from "react";

export function VideoDropzone() {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            // C'est ici que tu appelleras ta fonction d'upload vers Supabase ou ton backend
            console.log("Fichier prêt :", acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'video/*': [] }, // Accepte uniquement les vidéos
        maxFiles: 1
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors
                ${isDragActive ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/40"}`}
        >
            <input {...getInputProps()} />

            <div className="h-12 w-12 rounded-full bg-background border flex items-center justify-center text-muted-foreground shadow-sm">
                {file ? (
                    <FileVideo className="h-6 w-6 text-primary animate-pulse" />
                ) : (
                    <UploadCloud className="h-6 w-6" />
                )}
            </div>

            <div className="space-y-1">
                <p className="text-sm font-medium">
                    {file ? file.name : "Glissez-déposez votre vidéo ici"}
                </p>
                <p className="text-xs text-muted-foreground">
                    {file ? `${(file.size / (1024 * 1024)).toFixed(2)} Mo` : "Format MP4, MOV supportés (Max 500Mo)"}
                </p>
            </div>
        </div>
    );
}