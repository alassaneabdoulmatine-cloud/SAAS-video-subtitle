import { Module } from '@nestjs/common';
import { PrismaModule } from './Prisma/prisma.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, WorkspaceModule, UserModule, AuthModule],
})
export class AppModule { }
