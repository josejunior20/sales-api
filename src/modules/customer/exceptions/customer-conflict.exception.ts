import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class CustomerConflictException extends AppException {
  constructor() {
    super({
      message: 'Existe um cliente cadastrado com este cpf ou cnpj',
      status: HttpStatus.CONFLICT,
    });
  }
}
