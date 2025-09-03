import { UserConflictException } from '@modules/user/exceptions/user-conflict-exception';
import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { UserPasswordNotMatchException } from '@modules/user/exceptions/user-password-not-match-exception';
import { UserPasswordRequiredException } from '@modules/user/exceptions/user-password-required-exception';
import { Injectable } from '@nestjs/common';
import { Email } from '@shared/domain/values-objects/email.value-object';

import { User } from '../entities/User';
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
    email,
    name,
    oldPassword,
    password,
    userId,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    const updateEmail = await this.userRepository.findByEmail(email);
    if (updateEmail && updateEmail.id !== user.id)
      throw new UserConflictException();

    if (password) {
      if (!oldPassword) throw new UserPasswordRequiredException();

      const validOldPassword = await this.hashPassword.compareHash(
        oldPassword,
        user.password,
      );
      if (!validOldPassword) throw new UserPasswordNotMatchException();
      const newHashPassword = await this.hashPassword.generateHash(password);
      user.updateProfile({ password: newHashPassword });
    }
    user.updateProfile({
      name,
      email: new Email(email),
    });

    await this.userRepository.save(user);
    return { user };
  }
}
