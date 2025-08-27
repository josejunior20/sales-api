import { Injectable, NestMiddleware } from '@nestjs/common';
import { IncorrectValuesException } from '@shared/exceptions/incorrect-values-exception';
import { mapperClassValidationErrorToAppException } from '@shared/exceptions/mappers/exception.mapper';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class SignInValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInDto();
    signInBody.email = body.email;
    signInBody.password = body.password;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new IncorrectValuesException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }

    next();
  }
}
