import { UserConflictException } from '@modules/user/exceptions/user-conflict-exception';
import { Injectable } from '@nestjs/common';
import { Email } from '@shared/domain/values-objects/email.value-object';

import { User } from '../entities/User';
import { HashPasswordRepository } from '../repositories/hash-password-repository';
import { UserRepository } from '../repositories/user-repository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: HashPasswordRepository,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const registeredEmail = await this.userRepository.findByEmail(email);
    if (registeredEmail) {
      throw new UserConflictException();
    }

    const encryptedPassword = await this.hashPassword.generateHash(password);
    const user = new User({
      email: new Email(email),
      name,
      password: encryptedPassword,
    });

    await this.userRepository.create(user);
    return { user };
  }
}
