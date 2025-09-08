import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class CustomerEmailConflictException extends AppException {
  constructor() {
    super({
      message: 'Existe um cliente cadastrado com este email !!!',
      status: HttpStatus.CONFLICT,
    });
  }
}
