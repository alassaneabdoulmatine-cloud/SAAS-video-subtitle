import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import * as path from 'path';
import * as os from 'os';

@Injectable()
export class FfmpegService {
    constructor() {
        ffmpeg.setFfmpegPath(ffmpegPath);
    }

    /**
     * Extrait l'audio d'une vidéo distante en streaming et la compresse pour Whisper
     * @param videoUrl URL de la vidéo (CloudFront)
     * @param videoId ID unique pour nommer le fichier temporaire
     * @returns Le chemin absolu du fichier MP3 généré
     */
    async extractAudioForWhisper(videoUrl: string, videoId: string): Promise<string> {
        const tempDir = os.tmpdir();
        const audioFileName = `audio-${videoId}-${Date.now()}.mp3`;
        const audioOutputPath = path.join(tempDir, audioFileName);

        return new Promise((resolve, reject) => {
            ffmpeg(videoUrl)
                .noVideo()
                .audioCodec('libmp3lame')
                .audioBitrate(96)
                .audioChannels(1)
                .audioFrequency(16000)
                .outputOptions('-threads 1')
                .output(audioOutputPath)
                .on('start', () => {
                    console.log(`[FFmpeg] Début de l'extraction streaming pour la vidéo : ${videoId}`);
                })
                .on('end', () => {
                    console.log(`[FFmpeg] Extraction réussie -> ${audioOutputPath}`);
                    resolve(audioOutputPath);
                })
                .on('error', (err) => {
                    console.error('[FFmpeg] Erreur durant le processing :', err);
                    reject(err);
                })
                .run();
        });
    }

    /**
     * 🖼️ ÉTAPE COMPLÉMENTAIRE : Extrait une miniature (JPEG) à la 1ère seconde de la vidéo
     * @param videoUrl URL de la vidéo distante (CloudFront / S3)
     * @param videoId ID unique pour nommer l'image
     * @returns Le chemin absolu du fichier .jpg généré sur le VPS
     */
    async extractThumbnail(videoUrl: string, videoId: string): Promise<string> {
        const tempDir = os.tmpdir();
        const thumbnailName = `thumb-${videoId}-${Date.now()}.jpg`;
        const thumbnailOutputPath = path.join(tempDir, thumbnailName);

        return new Promise((resolve, reject) => {
            ffmpeg(videoUrl)
                // On cible le moment précis de la capture (1ère seconde)
                .seekInput('00:00:01.000')
                // On demande 1 seule image
                .frames(1)
                // Option de redimensionnement (optionnelle, conserve le ratio original ici)
                .size('?x720') // Force une hauteur de 720p pour que l'image soit légère mais nette
                .output(thumbnailOutputPath)
                .on('start', () => {
                    console.log(`[FFmpeg] Début de l'extraction de la miniature pour : ${videoId}`);
                })
                .on('end', () => {
                    console.log(`[FFmpeg] Miniature extraite avec succès -> ${thumbnailOutputPath}`);
                    resolve(thumbnailOutputPath);
                })
                .on('error', (err) => {
                    console.error('[FFmpeg] Erreur durant l\'extraction de la miniature :', err);
                    reject(err);
                })
                .run();
        });
    }
}