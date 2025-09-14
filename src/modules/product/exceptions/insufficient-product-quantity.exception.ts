import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class InsufficientProductQuantityException extends AppException {
  constructor() {
    super({
      message: 'Quantidade insuficiente em estoque.',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
