import { InvalidCPFException } from '../exceptions/invalid-cpf.exception';

export class CPF {
  private constructor(private readonly value: string) {}

  static create(cpf: string): CPF {
    if (!cpf || typeof cpf !== 'string') {
      throw new InvalidCPFException(cpf);
    }

    const cleanCpf = cpf.replace(/\D/g, '');
    if (!CPF.isValid(cleanCpf)) {
      throw new InvalidCPFException(cpf);
    }

    return new CPF(cleanCpf);
  }

  private static isValid(cpf: string): boolean {
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // All same digits

    // Validate check digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9), 10)) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf.charAt(10), 10);
  }

  toString(): string {
    return this.value;
  }

  toFormattedString(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  equals(other: CPF): boolean {
    if (!(other instanceof CPF)) {
      return false;
    }
    return this.value === other.value;
  }
}
