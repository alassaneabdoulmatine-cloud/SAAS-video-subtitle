export type UploaderOptions = {
    chunkSize?: number;
    maxConcurrent?: number;
    token: string; // Obligatoire pour sécuriser tes appels API
    onProgress?: (percentage: number) => void;
}

export type CompletedPart = {
    PartNumber: number;
    ETag: string;
}