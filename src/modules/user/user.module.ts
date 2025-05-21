import { Module } from '@nestjs/common';

import { PrismaUserModule } from './infra/prisma/prisma-user.module';

@Module({
  imports: [PrismaUserModule],
})
export class UserModule {}
