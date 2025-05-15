import { HashPasswordRepository } from '@modules/user/domain/repositories/hash-password-repository';
import { UserRepository } from '@modules/user/domain/repositories/user-repository';
import { HashPasswordProvider } from '@modules/user/providers/hash-password-provider/hash-password-provider';
import { Module } from '@nestjs/common';

import { PrismaUserRepository } from './repositories/prisma-user-repository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: HashPasswordRepository,
      useClass: HashPasswordProvider,
    },
  ],
  exports: [UserRepository, HashPasswordProvider],
})
export class PrismaUserModule {}
