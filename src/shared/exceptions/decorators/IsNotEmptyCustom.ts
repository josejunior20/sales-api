import {
  isNotEmpty,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { ExceptionMessage } from '../custom-class-validator/exception-message';

export function IsNotEmptyCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmptyCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isNotEmpty(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsNotEmpty(validationArguments.property);
        },
      },
    });
  };
}
