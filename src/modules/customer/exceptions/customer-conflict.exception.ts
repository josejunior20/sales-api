import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class CustomerConflictException extends AppException {
  constructor() {
    super({
      message: 'Existe um client cadastrado com este cpf',
      status: HttpStatus.CONFLICT,
    });
  }
}
