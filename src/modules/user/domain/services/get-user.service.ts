import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { Injectable } from '@nestjs/common';

import { User } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';

interface GetUserRequest {
  userId: string;
}

interface GetUserResponse {
  user: User;
}

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    return { user };
  }
}
