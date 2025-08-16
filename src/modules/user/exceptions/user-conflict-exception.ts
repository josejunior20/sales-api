import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class UserConflictException extends AppException {
  constructor() {
    super({
      message: 'Existe um usuário cadastrado com este email !!!',
      status: HttpStatus.CONFLICT,
    });
  }
}
