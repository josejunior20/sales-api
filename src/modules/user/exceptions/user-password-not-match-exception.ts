import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class UserPasswordNotMatchException extends AppException {
  constructor() {
    super({
      message: 'Senha incorreta !!!',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
