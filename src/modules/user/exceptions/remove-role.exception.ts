import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class RemoveRoleExceptions extends AppException {
  constructor() {
    super({
      message: 'O papel USER não pode ser removido!!!',
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
