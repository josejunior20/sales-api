import { Injectable } from '@nestjs/common';

import { User } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';

interface GetAllUsersResponse {
  users: User[];
}
@Injectable()
export class GetAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<GetAllUsersResponse> {
    const users = await this.userRepository.findAll();
    return { users };
  }
}
