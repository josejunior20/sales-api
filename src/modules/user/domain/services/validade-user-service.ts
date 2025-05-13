import { UserRepository } from '@modules/user/domain/repositories/user-repository';
import { AuthIncorrectExceptions } from '@modules/user/exceptions/auth-incorrect-exception';
import { Injectable } from '@nestjs/common';

import { User } from '../entities/User';
import { HashPasswordRepository } from '../repositories/hash-password-repository';

interface ValidateUserRequest {
  email: string;
  password: string;
}

interface ValidateUserResponse {
  user: User;
}

@Injectable()
export class ValidateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: HashPasswordRepository,
  ) {}

  async execute({
    email,
    password,
  }: ValidateUserRequest): Promise<ValidateUserResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AuthIncorrectExceptions();

    const isPasswordMatched = await this.hashPassword.compareHash(
      password,
      user.password,
    );
    if (!isPasswordMatched) throw new AuthIncorrectExceptions();

    return { user };
  }
}
