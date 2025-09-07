import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { ExceptionMessage } from '../custom-class-validator/exception-message';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailCustom',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === undefined || value === null) return true;
          if (typeof value !== 'string') return false;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsEmail(validationArguments.property);
        },
      },
    });
  };
}
