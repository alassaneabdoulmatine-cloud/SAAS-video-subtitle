import axios from "axios";
import { UploaderOptions, CompletedPart } from "./types/uplodad-types";

export class MultipartUploader {
    private file: File;
    private chunkSize: number;
    private maxConcurrent: number;
    private onProgress: (percentage: number) => void;

    // Pour suivre précisément les octets envoyés par chaque morceau
    private trackProgress: Record<number, number> = {};

    constructor(file: File, options: UploaderOptions) {
        this.file = file;
        this.chunkSize = options.chunkSize || 10 * 1024 * 1024; // 10MB par défaut
        this.maxConcurrent = options.maxConcurrent || 3;
        this.onProgress = options.onProgress || (() => { });
    }

    async upload(): Promise<string> {
        // Étape 1 : Initialiser l'upload au niveau du backend
        const { data: initData } = await axios.post(
            "/api/upload/multipart/initiate",
            {
                filename: this.file.name,
                contentType: this.file.type,
                fileSize: this.file.size,
            },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        const { uploadId, key, chunkSize } = initData;
        if (chunkSize) this.chunkSize = chunkSize;

        // Étape 2 : Calculer et générer la liste des morceaux
        const numParts = Math.ceil(this.file.size / this.chunkSize);
        const parts = Array.from({ length: numParts }, (_, i) => i + 1);
        const completedParts: CompletedPart[] = [];

        // Étape 3 : Traiter les morceaux par paquets (Gestion de la concurrence)
        while (parts.length > 0) {
            const batch = parts.splice(0, this.maxConcurrent);

            const batchPromises = batch.map((partNumber) =>
                this.uploadPart(key, uploadId, partNumber)
            );

            const results = await Promise.all(batchPromises);
            completedParts.push(...results);
        }

        // Étape 4 : Finaliser l'upload multipart
        await axios.post(
            "/api/upload/multipart/complete",
            { key, uploadId, parts: completedParts },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        return key;
    }

    private async uploadPart(key: string, uploadId: string, partNumber: number): Promise<CompletedPart> {
        // 1. Demander l'URL pré-signée pour ce morceau spécifique
        const { data: urlData } = await axios.post(
            "/api/upload/multipart/get-presigned-url",
            { key, uploadId, partNumber },
            {
                withCredentials: true
            }
        );

        const { uploadUrl } = urlData;

        // 2. Découper le fichier pour extraire le Blob correspondant
        const start = (partNumber - 1) * this.chunkSize;
        const end = Math.min(start + this.chunkSize, this.file.size);
        const chunk = this.file.slice(start, end);

        // 3. Envoyer directement le morceau sur le stockage (S3)
        // ATTENTION : Pas de withCredentials ici, car S3 n'a pas besoin de ton cookie de session !
        const response = await axios.put(uploadUrl, chunk, {
            headers: { "Content-Type": this.file.type },
            onUploadProgress: (e) => {
                if (e.total) {
                    this.trackProgress[partNumber] = e.loaded;

                    const totalUploadedBytes = Object.values(this.trackProgress).reduce(
                        (acc, currentBytes) => acc + currentBytes,
                        0
                    );

                    const totalProgress = Math.min((totalUploadedBytes / this.file.size) * 100, 100);
                    this.onProgress(totalProgress);
                }
            },
        });

        // 4. Récupérer l'ETag renvoyé par S3
        const etag = response.headers["etag"];
        if (!etag) throw new Error(`Part ${partNumber} upload failed: missing ETag`);

        return {
            PartNumber: partNumber,
            ETag: etag.replace(/"/g, ""),
        };
    }
}