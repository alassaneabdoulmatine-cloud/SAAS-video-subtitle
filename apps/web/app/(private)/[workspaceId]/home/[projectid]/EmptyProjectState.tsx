import { UploadCloud } from "lucide-react";

export default function EmptyProjectState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] rounded-xl border-2 border-dashed p-12 text-center bg-muted/10 hover:bg-muted/20 transition-all cursor-pointer group">
            <div className="h-16 w-16 rounded-full bg-card border flex items-center justify-center text-muted-foreground mb-4 shadow-sm group-hover:scale-105 group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
                <UploadCloud className="h-7 w-7 stroke-[1.5]" />
            </div>
            <div className="max-w-md space-y-2">
                <h2 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                    Importez votre première vidéo
                </h2>
                <p className="text-sm text-muted-foreground px-6">
                    Ce projet est vide. Glissez-déposez votre fichier vidéo ici, ou cliquez pour parcourir vos fichiers. (Formats acceptés : MP4, MOV, etc.)
                </p>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold border shadow-sm">
                Taille max : 500 Mo
            </div>
        </div>
    );
}