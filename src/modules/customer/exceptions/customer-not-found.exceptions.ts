import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class CustomerNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Cliente não encontrado !!!',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
