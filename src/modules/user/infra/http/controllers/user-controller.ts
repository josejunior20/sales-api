import { CreateUserService } from '@modules/user/domain/services/create-user-service';
import { ShowAllUsersService } from '@modules/user/domain/services/show-all-users-service';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from '../dtos/create-user-dto';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly listUsers: ShowAllUsersService,
  ) {}

  @Post()
  async create(@Body() { email, name, password }: CreateUserDto) {
    const { user } = await this.createUser.execute({
      email,
      name,
      password,
    });

    return { user: UserViewModel.toHttp(user) };
  }

  @Get()
  async listAll() {
    const { users } = await this.listUsers.execute();
    return { users: users.map(UserViewModel.toHttp) };
  }
}
