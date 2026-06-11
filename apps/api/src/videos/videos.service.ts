import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {
  constructor(private readonly prisma: PrismaService) { }

  // Vérifie l'accès au projet dans le workspace
  private async ensureProjectAccess(projectId: string, workspaceId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        workspaceId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // Vérifie si une vidéo existe dans le projet
  private async ensureVideoExists(videoId: string, projectId: string) {
    const video = await this.prisma.video.findFirst({
      where: {
        id: videoId,
        projectId,
      },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return video;
  }

  // CREATE
  async create(createVideoDto: CreateVideoDto, projectId: string, workspaceId: string,) {
    await this.ensureProjectAccess(projectId, workspaceId);

    const { title, description, status, fileName, fileSize, mimeType, duration } = createVideoDto;

    return this.prisma.video.create({
      data: {
        title,
        description,
        status,
        fileName,
        fileSize,
        mimeType,
        duration,
        projectId,
      },
    });
  }

  // FIND ALL
  async findAll(projectId: string, workspaceId: string) {
    await this.ensureProjectAccess(projectId, workspaceId);

    return this.prisma.video.findMany({
      where: { projectId },
    });
  }

  // FIND ONE
  async findOne(id: string, projectId: string, workspaceId: string,) {
    await this.ensureProjectAccess(projectId, workspaceId);

    return this.ensureVideoExists(id, projectId);
  }

  // UPDATE
  async update(id: string, updateVideoDto: UpdateVideoDto, projectId: string, workspaceId: string,) {
    await this.ensureProjectAccess(projectId, workspaceId);
    await this.ensureVideoExists(id, projectId);

    const { title, description, status, fileName, fileSize, mimeType, duration } = updateVideoDto;

    return this.prisma.video.update({
      where: { id },
      data: {
        title,
        description,
        status,
        fileName,
        fileSize,
        mimeType,
        duration,
      },
    });
  }

  // DELETE
  async remove(id: string, projectId: string, workspaceId: string,) {
    await this.ensureProjectAccess(projectId, workspaceId);
    await this.ensureVideoExists(id, projectId);

    return this.prisma.video.delete({
      where: { id },
    });
  }
}