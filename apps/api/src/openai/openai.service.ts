import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { StylizedWord } from './types/StylizedWord';

@Injectable()
export class OpenAiService {
    private openai: OpenAI;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.getOrThrow('OPENAI_API_KEY'),
        });
    }


    /**
     * Appelle l'API Whisper pour transcrire un fichier audio
     */
    async transcribe(audioPath: string): Promise<any> {
        const audioFileStream = fs.createReadStream(audioPath);
        return this.openai.audio.transcriptions.create({
            file: audioFileStream,
            model: 'whisper-1',
            response_format: 'verbose_json',
            timestamp_granularities: ['word'],
        });
    }

    /**
   * Prends le JSON brut de Whisper et le transforme en JSON de Shorts dynamique
   * @param whisperJsonBrut Les mots extraits directement par Whisper
   * @returns {Promise<StylizedWord[]>}
   */
    async stylizeSubtitles(whisperJsonBrut: any[]): Promise<StylizedWord[]> {

        // Le prompt système ultra-strict pour forcer GPT à respecter le format et le rythme
        const systemPrompt = `
      Tu es un monteur vidéo professionnel expert en Shorts, Reels et TikTok.
      Ton travail est de prendre un JSON de sous-titres bruts (mot par mot) et de l'enrichir pour le rendre ultra-dynamique.

      RÈGLES STRICTES DE DÉCOUPAGE ET STYLE :
      1. Tu dois garder EXACTEMENT les mêmes timestamps "start" et "end" pour chaque mot. Ne change JAMAIS le temps.
      2. Ne modifie pas l'orthographe des mots sauf s'il y a une erreur flagrante de transcription.
      3. Ajoute un champ "emoji" : Mets un emoji pertinent contextuel (uniquement sur les mots forts, max 20% des mots). Si pas d'emoji, mets null.
      4. Ajoute un champ "color" : Choisis une couleur pour chaque mot.
         - Blanc ('#FFFFFF') pour les mots normaux.
         - Jaune ('#FFFF00') ou Rouge ('#FF0000') pour les mots TRÈS importants (punchlines, chiffres, verbes d'action).
      5. Format de réponse : Tu dois renvoyer UNIQUEMENT un tableau JSON valide. Pas de texte avant, pas de texte après, pas de balises \`\`\`json.
    `;

        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: JSON.stringify(whisperJsonBrut) }
                ],
                temperature: 0.3, // Basse pour rester strict sur les règles et ne pas inventer d'histoire
                response_format: { type: "json_object" }
            });

            const content = response.choices[0].message.content;

            if (!content) {
                throw new Error("OpenAI a renvoyé une réponse vide.");
            }

            // On parse le résultat pour récupérer notre tableau propre
            const parsedData = JSON.parse(content);

            // Selon comment GPT encapsule (parfois il met un objet avec une clé 'subtitles'), on extrait le tableau
            return Array.isArray(parsedData) ? parsedData : parsedData.subtitles || Object.values(parsedData)[0];

        } catch (error) {
            console.error("[OpenAiService Erreur] :", error);
            throw error;
        }
    }
}