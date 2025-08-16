import {
  isDate,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { ExceptionMessage } from '../custom-class-validator/exception-message';

export function IsDateCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsDateCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Date) {
          return isDate(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsDate(validationArguments.property);
        },
      },
    });
  };
}
