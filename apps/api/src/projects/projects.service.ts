import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from 'src/Prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  private async ensureProjectExists(projectId: string, workspaceId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, workspaceId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async create(createProjectDto: CreateProjectDto, workspaceId: string) {
    const project = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        workspaceId
      },
    });

    return project;
  }

  async findAll(workspaceId: string) {
    const projects = await this.prisma.project.findMany({
      where: { workspaceId },
    });

    return projects;
  }

  async findOne(id: string, workspaceId: string) {

    return this.ensureProjectExists(id, workspaceId);

  }

  async update(id: string, updateProjectDto: UpdateProjectDto, workspaceId: string) {

    await this.ensureProjectExists(id, workspaceId);

    const project = await this.prisma.project.update({
      where: { id },
      data: { name: updateProjectDto.name },
    });

    return project;
  }

  async remove(id: string, workspaceId: string) {

    await this.ensureProjectExists(id, workspaceId);

    const project = await this.prisma.project.delete({
      where: { id },
    });

    return project;
  }
}