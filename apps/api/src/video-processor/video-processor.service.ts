import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import { OpenAiService } from 'src/openai/openai.service';
import { FfmpegService } from 'src/ffmpeg/ffmpeg.service';
import { UploadService } from 'src/upload/upload.service';
import { VideoStatus } from '@prisma/client';
import { VideosService } from 'src/videos/videos.service';


@Injectable()
export class VideoProcessorService {
    constructor(
        @InjectQueue('video-processing') private readonly videoProcessingQueue: Queue,
        private readonly openAiService: OpenAiService,
        private readonly ffmpegService: FfmpegService,
        private readonly UploadService: UploadService,
        private readonly videoService: VideosService
    ) { }


    /**
     * Envoie le job à la file d'attente BullMQ
     */
    async processVideo(videoUrl: string, videoId: string) {
        await this.videoProcessingQueue.add('process-video', {
            videoUrl,
            videoId,
        });
        console.log("Job ajouté à la file d'attente BullMQ");
    }

    /**
   * Cette méthode pilote le pipeline de traitement de manière ultra lisible
   * 1-Extraction de la miniature depuis le flux CloudFront (Streaming, pas de téléchargement complet)
   * 2- Extraction de l'audio depuis le flux CloudFront (Streaming, pas de téléchargement complet)
   * 3- Transcription vers Whisper
   * 4- Stylisation (bientôt)
   */
    async processVideoPipeline(videoUrl: string, videoId: string, projectId: string, workspaceId: string): Promise<any> {
        let tempAudioPath = '';
        let tempThumbPath = '';
        const thumbnailKey = `public/${videoId}/thumbnail.jpg`;


        try {
            // 1. Extraction de la miniature en parallèle ou juste avant
            tempThumbPath = await this.ffmpegService.extractThumbnail(videoUrl, videoId);

            // 💡 [Ici tu feras l'upload de la miniature sur S3]
            const thumbS3Url = await this.UploadService.uploadLocalFile(tempThumbPath, thumbnailKey);


            // 2. Extraction de l'audio
            tempAudioPath = await this.ffmpegService.extractAudioForWhisper(videoUrl, videoId);

            // 3. Transcription Whisper
            const transcription = await this.openAiService.transcribe(tempAudioPath);

            // 4. Stylisation avec GPT-4o mini (À faire)
            const stylizedSubtitles = await this.openAiService.stylizeSubtitles(transcription);

            await this.videoService.update(videoId, {
                thumbnailUrl: thumbS3Url,
                thumbnailKey: thumbnailKey,
                subtitles: stylizedSubtitles,
                status: VideoStatus.SUCCESS,
            }, projectId, workspaceId);

            return { transcription, tempThumbPath, thumbnailKey, stylizedSubtitles };
        } catch (error) {
            console.error(`[Pipeline Error] Échec du traitement pour la vidéo ${videoId}`, error);
            throw error;
        } finally {
            // Nettoyage rigoureux du VPS pour les DEUX fichiers temporaires
            if (tempAudioPath && fs.existsSync(tempAudioPath)) {
                fs.unlinkSync(tempAudioPath);
            }
            if (tempThumbPath && fs.existsSync(tempThumbPath)) {
                fs.unlinkSync(tempThumbPath);
                console.log(`[Clean] Miniature temporaire supprimée du disque.`);
            }
        }
    }
}