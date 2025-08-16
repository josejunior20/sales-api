import { HttpStatus } from '@nestjs/common';
import { AppException } from '@shared/exceptions/app-exception';

export class InvalidAccessTokenExceptions extends AppException {
  constructor() {
    super({
      message: 'Access token inválido ou expirado !!!',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
