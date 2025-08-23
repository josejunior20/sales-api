import { InvalidPhoneException } from '@shared/exceptions/Invalid-phone.exception';

export class Phone {
  private readonly value: string;

  constructor(value: string) {
    if (!Phone.isValid(value)) {
      throw new InvalidPhoneException();
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  private static isValid(value: string): boolean {
    const phoneRegex = /^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/;
    return phoneRegex.test(value);
  }
}
