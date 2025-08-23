import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class InvalidPhoneException extends AppException {
  constructor() {
    super({
      message: 'Telefone inválido.',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
