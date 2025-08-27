import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class InvalidCustomerNameException extends AppException {
  constructor() {
    super({
      message: 'Digite um nome valido !!!',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
