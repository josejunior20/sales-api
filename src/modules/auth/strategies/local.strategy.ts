import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { ValidateUserService } from '../services/validade-user.services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserService: ValidateUserService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const { user } = await this.validateUserService.execute({
      email,
      password,
    });
    return user;
  }
}
