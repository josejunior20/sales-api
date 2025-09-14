import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class ProductNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Produto não encontrado !!!',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
