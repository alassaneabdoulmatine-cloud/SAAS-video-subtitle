import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WorkspaceMemberGuard } from 'src/authorization/guards/WorkspaceMemberGuard';

@UseGuards(JwtAuthGuard, WorkspaceMemberGuard)
@Controller(':workspaceId/projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) { }

  @Post()
  create(
    @Param('workspaceId') workspaceId: string,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectsService.create(
      dto,
      workspaceId,
    );
  }

  @Get()
  findAll(
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.projectsService.findAll(
      workspaceId,
    );
  }

  @Get(':id')
  findOne(
    @Param('workspaceId') workspaceId: string,
    @Param('id') id: string,
  ) {
    return this.projectsService.findOne(
      id,
      workspaceId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.projectsService.update(
      id,
      dto,
      workspaceId,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.projectsService.remove(
      id,
      workspaceId,
    );
  }
}