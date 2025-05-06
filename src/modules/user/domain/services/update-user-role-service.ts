import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { Injectable } from '@nestjs/common';

import { User, UserRole } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';

interface UpdateUserRoleRequest {
  userId: string;
  roles: UserRole[];
}

interface UpdateUserRoleResponse {
  user: User;
}

@Injectable()
export class UpdateUserRoleService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    roles,
    userId,
  }: UpdateUserRoleRequest): Promise<UpdateUserRoleResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    user.roles = roles;
    user.updatedAt = new Date();

    await this.userRepository.save(user);

    return { user };
  }
}
