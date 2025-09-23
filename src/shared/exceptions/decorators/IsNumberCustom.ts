import {
  isString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { ExceptionMessage } from '../custom-class-validator/exception-message';

export function IsNumberCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNumberCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === 'number' && !isNaN(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsNumber(validationArguments.property);
        },
      },
    });
  };
}
