import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class InvalidEmailException extends AppException {
  constructor() {
    super({
      message: 'E-mail inválido.',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
