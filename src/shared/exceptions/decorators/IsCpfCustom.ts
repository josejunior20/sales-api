import { Cpf } from '@shared/domain/values-objects/cpf.value-object';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { ExceptionMessage } from '../custom-class-validator/exception-message';

export function IsCpfCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsCpfCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          try {
            new Cpf(value);
            return true;
          } catch (error) {
            return false;
          }
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionMessage.IsCpf(validationArguments.property);
        },
      },
    });
  };
}
