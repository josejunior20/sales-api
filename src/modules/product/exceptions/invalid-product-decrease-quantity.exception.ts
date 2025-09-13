import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class InvalidProductDecreaseQuantityException extends AppException {
  constructor() {
    super({
      message: 'Quantidade de produto reduzida deve ser maior que 0',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
