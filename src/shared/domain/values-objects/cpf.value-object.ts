import { InvalidCpfException } from '@shared/exceptions/Invalid-cpf.exception';

export class Cpf {
  private readonly value: string;

  constructor(cpf: string) {
    if (!Cpf.isValid(cpf)) {
      throw new InvalidCpfException();
    }
    this.value = Cpf.clean(cpf);
  }

  getValue(): string {
    return this.value;
  }

  getMaskedValue(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private static clean(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  private static isValid(cpf: string): boolean {
    cpf = this.clean(cpf);

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }
}
