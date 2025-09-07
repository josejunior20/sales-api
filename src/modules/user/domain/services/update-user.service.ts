import { UserConflictException } from '@modules/user/exceptions/user-conflict-exception';
import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { UserPasswordNotMatchException } from '@modules/user/exceptions/user-password-not-match-exception';
import { UserPasswordRequiredException } from '@modules/user/exceptions/user-password-required-exception';
import { Injectable } from '@nestjs/common';
import { Email } from '@shared/domain/values-objects/email.value-object';

import { User, UserProps } from '../entities/User';
import { HashPasswordRepository } from '../repositories/hash-password-repository';
import { UserRepository } from '../repositories/user-repository';

export interface UpdateUserRequest {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
}

interface UpdateUserResponse {
  user: User;
}

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: HashPasswordRepository,
  ) {}

  async execute({
    userId,
    email,
    name,
    password,
    oldPassword,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    if (email && email !== user.email.getValue()) {
      const existingEmailUser = await this.userRepository.findByEmail(email);
      if (existingEmailUser && existingEmailUser.id !== user.id) {
        throw new UserConflictException();
      }
    }

    if (password) {
      if (!oldPassword) throw new UserPasswordRequiredException();

      const isOldPasswordValid = await this.hashPassword.compareHash(
        oldPassword,
        user.password,
      );
      if (!isOldPasswordValid) throw new UserPasswordNotMatchException();

      const hashedPassword = await this.hashPassword.generateHash(password);
      user.updateProfile({ password: hashedPassword });
    }

    const updateData: Partial<UserProps> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = new Email(email);

    if (Object.keys(updateData).length > 0) {
      user.updateProfile(updateData);
    }

    await this.userRepository.save(user);

    return { user };
  }
}
