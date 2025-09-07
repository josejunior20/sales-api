import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { ExceptionMessage } from '../custom-class-validator/exception-message';

export function MinLengthCustom(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MinLengthCustom',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === undefined || value === null) return true;
          if (typeof value !== 'string') return false;
          return value.length >= min;
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.MinLength(validationArguments.property, min);
        },
      },
    });
  };
}
