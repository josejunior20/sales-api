import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class UserNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Usuário não encontrado !!!',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
