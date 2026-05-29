import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { WorkspaceController } from './workspace.controller';

@Module({
  imports: [PrismaModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule { }
