import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthorizationModule],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule { }
