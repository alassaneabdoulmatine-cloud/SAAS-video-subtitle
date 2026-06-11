import { Module } from '@nestjs/common';
import { VideoProcessorService } from './video-processor.service';
import { VideoProcessorController } from './video-processor.controller';
import { BullModule } from '@nestjs/bullmq';
import { VideoProcessorConsumer } from './video-preocessor.process';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { OpenAiModule } from 'src/openai/openai.module';
import { FfmpegModule } from 'src/ffmpeg/ffmpeg.module';
import { UploadModule } from 'src/upload/upload.module';
import { VideosModule } from 'src/videos/videos.module';



@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video-processing',
    }),

    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),


    BullBoardModule.forFeature({
      name: 'video-processing',
      adapter: BullMQAdapter,
    }),

    OpenAiModule,
    FfmpegModule,
    UploadModule,
    VideosModule

  ],
  controllers: [VideoProcessorController],
  providers: [VideoProcessorService, VideoProcessorConsumer],
  exports: [VideoProcessorService],
})
export class VideoProcessorModule { }
