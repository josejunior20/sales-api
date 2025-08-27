import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { Injectable } from '@nestjs/common';

import { User, UserRole } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';

interface SetUserRoleRequest {
  userId: string;
  role: UserRole[];
}

interface SetUserRoleResponse {
  user: User;
}

@Injectable()
export class SetUserRoleService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    role,
    userId,
  }: SetUserRoleRequest): Promise<SetUserRoleResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    user.setRoles(role);

    await this.userRepository.save(user);

    return { user };
  }
}
