import { Injectable } from '@nestjs/common';
import { AbortMultipartUploadCommand, CompleteMultipartUploadCommand, CreateMultipartUploadCommand, DeleteObjectsCommand, S3Client, UploadPartCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid'
import { getSignedUrl as getS3SignedUrl } from '@aws-sdk/s3-request-presigner'
import { getSignedUrl as getCfSignedUrl } from "@aws-sdk/cloudfront-signer";
import * as fs from 'fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
    private readonly s3client: S3Client;
    private readonly BUCKET_NAME: string;
    // Optimal chunk size for network efficiency
    private readonly CHUNK_SIZE = 10 * 1024 * 1024; // 10MB

    constructor(private readonly configService: ConfigService) {

        this.BUCKET_NAME = this.configService.getOrThrow('AWS_BUCKET_NAME');

        this.s3client = new S3Client({
            region: this.configService.getOrThrow('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
        });

    }

    async initiateMultipartUpload(
        videoId: string,
        filename: string,
        contentType: string,
    ) {
        const key = `public/${videoId}/${filename}`;

        const command = new CreateMultipartUploadCommand({
            Bucket: this.BUCKET_NAME,
            Key: key,
            ContentType: contentType,
        });

        const response = await this.s3client.send(command);

        return {
            uploadId: response.UploadId,
            key: key,
            chunkSize: this.CHUNK_SIZE,
        };
    }

    async getPresignedPartUrl(
        key: string,
        uploadId: string,
        partNumber: number,
    ): Promise<string> {
        const command = new UploadPartCommand({
            Bucket: this.BUCKET_NAME,
            Key: key,
            UploadId: uploadId,
            PartNumber: partNumber,
        });

        // Longer expiration for large file parts
        return await getS3SignedUrl(this.s3client, command, {
            expiresIn: 3600 // 1 hour
        });
    }

    async completeMultipartUpload(
        key: string,
        uploadId: string,
        parts: Array<{ PartNumber: number; ETag: string }>,
    ) {
        const command = new CompleteMultipartUploadCommand({
            Bucket: this.BUCKET_NAME,
            Key: key,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts.sort((a, b) => a.PartNumber - b.PartNumber)
            },
        });

        return await this.s3client.send(command);
    }

    async abortMultipartUpload(key: string, uploadId: string) {
        const command = new AbortMultipartUploadCommand({
            Bucket: this.BUCKET_NAME,
            Key: key,
            UploadId: uploadId,
        });

        await this.s3client.send(command);
    }

    async getPrivateVideoUrl(videoKey: string) {
        const cloudfrontDistributionUrl = this.configService.getOrThrow('CLOUDFRONT_DISTRIBUTION_URL');
        const url = `${cloudfrontDistributionUrl}/${videoKey}`;

        const privateKey = this.configService.getOrThrow('CLOUDFRONT_PRIVATE_KEY').replace(/\\n/g, "\n");
        const keyPairId = this.configService.getOrThrow('CLOUDFRONT_KEY_PAIR_ID');

        console.log("privateKey : ", privateKey);
        console.log("keyPairId : ", keyPairId);

        const signedUrl = getCfSignedUrl({
            url: url,
            keyPairId: keyPairId,
            privateKey: privateKey,
            dateLessThan: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // Expire dans 1 heure
        });

        return signedUrl;
    }

    /**
   * Upload un fichier local présent sur le VPS vers S3
   * @param localFilePath Chemin absolu du fichier (ex: /tmp/thumb.jpg)
   * @param s3Key Le chemin de destination dans le bucket (ex: projets/123/thumbnail.jpg)
   */
    async uploadLocalFile(localFilePath: string, s3Key: string): Promise<string> {
        if (!fs.existsSync(localFilePath)) {
            throw new Error(`Le fichier local à uploader n'existe pas : ${localFilePath}`);
        }

        const fileStream = fs.createReadStream(localFilePath);
        const command = new PutObjectCommand({
            Bucket: this.BUCKET_NAME,
            Key: s3Key,
            Body: fileStream,
            ContentType: 'image/jpeg',
        });

        await this.s3client.send(command);
        const cloudfrontDistributionUrl = this.configService.getOrThrow('CLOUDFRONT_DISTRIBUTION_URL');
        return `${cloudfrontDistributionUrl}/${s3Key}`;
    }

    /**
   *  Supprime plusieurs fichiers d'un coup sur S3 à partir de leurs clés
   * @param s3Keys Tableau de clés (ex: ['public/...mp4', 'public/...jpg'])
   */
    async deleteMultipleFiles(s3Keys: string[]): Promise<void> {

        const validKeys = s3Keys.filter((key) => !!key);

        if (validKeys.length === 0) return;

        const command = new DeleteObjectsCommand({
            Bucket: this.BUCKET_NAME,
            Delete: {
                Objects: validKeys.map((key) => ({ Key: key })),
                Quiet: true, // Évite que S3 renvoie un rapport trop lourd en retour
            },
        });

        try {
            await this.s3client.send(command);
            console.log(`[S3] Nettoyage réussi pour les clés :`, validKeys);
        } catch (error) {
            console.error(`[S3 Erreur] Impossible de supprimer les fichiers :`, error);
            throw error;
        }
    }

}
