import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Strategy } from 'passport-local';

import { ValidateUserService } from '../services/validate-user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserService: ValidateUserService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: Email, password: string) {
    const { user } = await this.validateUserService.execute({
      email,
      password,
    });
    return user;
  }
}
