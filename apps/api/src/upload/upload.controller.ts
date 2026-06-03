import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload/multipart')
export class UploadController {

  constructor(private readonly uploadService: UploadService) { }

  @Post('initiate')
  async initiateMultipart(
    @Body() body: { filename: string; contentType: string; fileSize: number },
  ) {
    return await this.uploadService.initiateMultipartUpload(
      body.filename,
      body.contentType,
    );
  }

  @Post('part-url')
  async getPartUrl(
    @Body() body: { key: string; uploadId: string; partNumber: number },
  ) {
    const url = await this.uploadService.getPresignedPartUrl(
      body.key,
      body.uploadId,
      body.partNumber,
    );
    return { url };
  }

  @Post('complete')
  async completeMultipart(
    @Body() body: {
      key: string;
      uploadId: string;
      parts: Array<{ PartNumber: number; ETag: string }>;
    },
  ) {
    return await this.uploadService.completeMultipartUpload(
      body.key,
      body.uploadId,
      body.parts,
    );
  }

  @Post('abort')
  async abortMultipart(@Body() body: { key: string; uploadId: string }) {
    await this.uploadService.abortMultipartUpload(body.key, body.uploadId);
    return { success: true };
  }
}