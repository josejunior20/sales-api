import { HashPasswordRepository } from '@modules/user/domain/repositories/hash-password-repository';
import { UserRepository } from '@modules/user/domain/repositories/user-repository';
import { HashPasswordProvider } from '@modules/user/providers/hash-password-provider/hash-password-provider';
import { Module } from '@nestjs/common';
import { DbModule } from '@shared/database/database.module';

import { PrismaUserRepository } from './repositories/prisma-user-repository';

@Module({
  imports: [DbModule],
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
  exports: [UserRepository, HashPasswordRepository],
})
export class PrismaUserModule {}
