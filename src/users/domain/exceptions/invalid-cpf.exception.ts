import { DomainException } from './domain.exception';

export class InvalidCPFException extends DomainException {
  constructor(cpf: string) {
    super(`Invalid cpf format ${cpf}`);
  }
}
