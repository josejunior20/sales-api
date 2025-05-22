import { CreateUserService } from '@modules/user/domain/services/create-user-service';
import { ShowAllUsersService } from '@modules/user/domain/services/show-all-users-service';
import { Module } from '@nestjs/common';

import { PrismaUserModule } from '../prisma/prisma-user.module';
import { UserController } from './controllers/user-controller';

@Module({
  imports: [PrismaUserModule],
  controllers: [UserController],
  providers: [CreateUserService, ShowAllUsersService],
})
export class HttpUserModule {}
