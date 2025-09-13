import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class InvalidProductIncreaseQuantityException extends AppException {
  constructor() {
    super({
      message:
        'A quantidade de produto a ser adicionada deve ser maior que zero.',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
