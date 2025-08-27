import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user-repository';

interface DeleteUserRequest {
  userId: string;
}

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ userId }: DeleteUserRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    await this.userRepository.delete(user.id);
  }
}
