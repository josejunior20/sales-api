import { CreateUserService } from '@modules/user/domain/services/create-user-service';
import { DeleteUserService } from '@modules/user/domain/services/delete-user-service';
import { GetUserService } from '@modules/user/domain/services/get-user-service';
import { ShowAllUsersService } from '@modules/user/domain/services/show-all-users-service';
import { UpdateUserRoleService } from '@modules/user/domain/services/update-user-role-service';
import { UpdateUserService } from '@modules/user/domain/services/update-user-service';
import { Module } from '@nestjs/common';

import { PrismaUserModule } from '../prisma/prisma-user.module';
import { UserController } from './controllers/user-controller';

@Module({
  imports: [PrismaUserModule],
  controllers: [UserController],
  providers: [
    CreateUserService,
    ShowAllUsersService,
    GetUserService,
    UpdateUserRoleService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class HttpUserModule {}
