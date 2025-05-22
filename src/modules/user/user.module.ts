import { Module } from '@nestjs/common';

import { HttpUserModule } from './infra/http/http-user-module';
import { PrismaUserModule } from './infra/prisma/prisma-user.module';

@Module({
  imports: [PrismaUserModule, HttpUserModule],
  exports: [PrismaUserModule],
})
export class UserModule {}
