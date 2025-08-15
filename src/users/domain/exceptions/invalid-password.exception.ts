import { DomainException } from './domain.exception';

export class InvalidPasswordException extends DomainException {
  constructor(reason: string) {
    super(`Invalid password: ${reason}`);
  }
}
