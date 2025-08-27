import { InvalidEmailException } from '@shared/exceptions/Invalid-email.exception';

export class Email {
  private readonly value: string;

  constructor(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new InvalidEmailException();
    }
    this.value = value.toLowerCase();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
}
