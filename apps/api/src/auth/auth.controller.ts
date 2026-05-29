import { Controller, Request, Post, UseGuards, Body, Get, Res } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import express from 'express';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly workspaceService: WorkspaceService,
  ) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: express.Response) {
    const data = await this.authService.register(registerDto);
    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    const workspace = await this.workspaceService.create({
      name: `${data.user.name}'s workspace`,
    }, data.user.id);

    return {
      success: true,
      user: data.user,
      workspace
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: express.Response) {

    const data = await this.authService.login(req.user);

    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { success: true, user: data.user };
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie("access_token");
    return {
      message: "Logged out successfully",
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
