import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class InvalidCpfException extends AppException {
  constructor() {
    super({
      message: 'Cpf inválido !!!',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
