import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class UserPasswordRequiredException extends AppException {
  constructor() {
    super({
      message: 'A senha antiga é requirida !!!',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
