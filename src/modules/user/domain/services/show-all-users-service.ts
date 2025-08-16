import { Injectable } from '@nestjs/common';

import { User } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';

interface ShowAllUsersResponse {
  users: User[];
}
@Injectable()
export class ShowAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<ShowAllUsersResponse> {
    const users = await this.userRepository.findAll();
    return { users };
  }
}
