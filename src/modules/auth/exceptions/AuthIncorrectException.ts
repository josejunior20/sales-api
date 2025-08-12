import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class AuthIncorrectExceptions extends AppException {
  constructor() {
    super({
      message: 'Email ou senha incorretos !!!',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
