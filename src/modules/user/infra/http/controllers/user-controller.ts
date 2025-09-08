import { Public } from '@modules/auth/infra/decorators/isPublic';
import { CreateUserService } from '@modules/user/domain/services/create-user.service';
import { DeleteUserService } from '@modules/user/domain/services/delete-user.service';
import { GetAllUsersService } from '@modules/user/domain/services/get-all-users.service';
import { GetUserService } from '@modules/user/domain/services/get-user.service';
import { SetUserRoleService } from '@modules/user/domain/services/set-user-role.service';
import { UpdateUserService } from '@modules/user/domain/services/update-user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CustomUUIDPipe } from '@shared/pipes/custom-uuid.pipe';

import { CreateUserDto } from '../dtos/create-user-dto';
import { SetUserRoleDto } from '../dtos/set-user-role-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUsersService: GetAllUsersService,
    private readonly getUserService: GetUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly setUserRoleService: SetUserRoleService,
  ) {}

  @Post()
  @Public()
  async create(@Body() { email, name, password }: CreateUserDto) {
    await this.createUserService.execute({
      email,
      name,
      password,
    });

    return { message: 'User created successfully' };
  }

  @Get()
  async listAll() {
    const { users } = await this.listUsersService.execute();
    return { users: users.map(UserViewModel.toHttp) };
  }

  @Get(':id')
  async getUser(@Param('id', CustomUUIDPipe) userId: string) {
    const { user } = await this.getUserService.execute({
      userId,
    });
    return { user: UserViewModel.toHttp(user) };
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() { oldPassword, email, name, password }: UpdateUserDto,
  ) {
    await this.updateUserService.execute({
      email,
      name,
      oldPassword,
      password,
      userId,
    });
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') userId: string) {
    await this.deleteUserService.execute({ userId });
    return { message: 'User deleted successfully' };
  }

  @Patch(':id')
  @HttpCode(200)
  async updateUserRole(
    @Param('id', CustomUUIDPipe) userId: string,
    @Body() { role }: SetUserRoleDto,
  ) {
    await this.setUserRoleService.execute({ role, userId });
    return { message: 'User role updated successfully' };
  }
}
