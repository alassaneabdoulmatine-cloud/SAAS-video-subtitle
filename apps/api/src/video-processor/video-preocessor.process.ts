import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { VideoProcessorService } from './video-processor.service'; // Ajuste le chemin si nécessaire

@Processor('video-processing')
export class VideoProcessorConsumer extends WorkerHost {
    constructor(
        private readonly videoProcessorService: VideoProcessorService
    ) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        // On extrait les données qu'on avait passées lors du `.add()` dans BullMQ
        const { videoUrl, videoId, projectId, workspaceId } = job.data;

        console.log(`[BullMQ] Début du traitement du job "${job.name}" pour la vidéo : ${videoId}`);

        try {
            // On lance notre pipeline de la mort qui gère tout (FFmpeg -> Whisper -> GPT -> Prisma)
            const result = await this.videoProcessorService.processVideoPipeline(
                videoUrl,
                videoId,
                projectId,
                workspaceId
            );

            console.log(`[BullMQ] Succès du traitement pour la vidéo : ${videoId}`);
            return result;
        } catch (error) {
            console.error(`[BullMQ Erreur] Échec du job ${job.id} pour la vidéo ${videoId}:`, error);

            // On throw l'erreur pour que BullMQ sache que le job a échoué 
            // et puisse le mettre en statut "failed" (ou le relancer si configuré)
            throw error;
        }
    }
}