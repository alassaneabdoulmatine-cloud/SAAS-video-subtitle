import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WorkspaceMemberGuard } from 'src/authorization/guards/WorkspaceMemberGuard';

@UseGuards(JwtAuthGuard, WorkspaceMemberGuard)
@Controller(':workspaceId/projects/:projectId/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @Post()
  create(
    @Body() createVideoDto: CreateVideoDto,
    @Param('projectId') projectId: string,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.videosService.create(
      createVideoDto,
      projectId,
      workspaceId,
    );
  }

  @Get()
  findAll(
    @Param('projectId') projectId: string,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.videosService.findAll(
      projectId,
      workspaceId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.videosService.findOne(
      id,
      projectId,
      workspaceId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
    @Param('projectId') projectId: string,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.videosService.update(
      id,
      updateVideoDto,
      projectId,
      workspaceId,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
    @Param('workspaceId') workspaceId: string,
  ) {
    return this.videosService.remove(
      id,
      projectId,
      workspaceId,
    );
  }
}
