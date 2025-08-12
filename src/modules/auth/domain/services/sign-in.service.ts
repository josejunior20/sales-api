import { UserPayload } from '@modules/auth/infra/http/models/user-payload.model';
import { User } from '@modules/user/domain/entities/User';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface SignInRequest {
  user: User;
}
@Injectable()
export class SignInService {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
