import { User } from '@modules/user/domain/entities/User';
import { HashPasswordRepository } from '@modules/user/domain/repositories/hash-password-repository';
import { UserRepository } from '@modules/user/domain/repositories/user-repository';
import { AuthIncorrectExceptions } from '@modules/user/exceptions/auth-incorrect-exception';
import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { Injectable } from '@nestjs/common';

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
    private readonly hashPasswordRepository: HashPasswordRepository,
  ) {}

  async execute({
    email,
    password,
  }: ValidateUserRequest): Promise<ValidateUserResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UserNotFoundException();

    const isPasswordMatched = await this.hashPasswordRepository.compareHash(
      password,
      user.password,
    );
    if (!isPasswordMatched) throw new AuthIncorrectExceptions();

    return { user };
  }
}
