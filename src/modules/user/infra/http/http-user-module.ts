import { CreateUserService } from '@modules/user/domain/services/create-user.service';
import { DeleteUserService } from '@modules/user/domain/services/delete-user.service';
import { GetAllUsersService } from '@modules/user/domain/services/get-all-users.service';
import { GetUserService } from '@modules/user/domain/services/get-user.service';
import { SetUserRoleService } from '@modules/user/domain/services/set-user-role.service';
import { UpdateUserService } from '@modules/user/domain/services/update-user.service';
import { Module } from '@nestjs/common';

import { PrismaUserModule } from '../prisma/prisma-user.module';
import { UserController } from './controllers/user-controller';

@Module({
  imports: [PrismaUserModule],
  controllers: [UserController],
  providers: [
    CreateUserService,
    GetAllUsersService,
    GetUserService,
    SetUserRoleService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class HttpUserModule {}
