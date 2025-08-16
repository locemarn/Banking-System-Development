import { InvalidPasswordException } from '../exceptions/invalid-password.exception';

export class Password {
  private constructor(private readonly value: string) {}

  static create(password: string): Password {
    if (!password || typeof password !== 'string') {
      throw new InvalidPasswordException('Password must be a non-empty string');
    }

    if (!Password.isValid(password)) {
      throw new InvalidPasswordException(
        Password.getValidationErrors(password) || 'Invalid password',
      );
    }
    return new Password(password);
  }

  private static isValid(password: string): boolean {
    return Password.getValidationErrors(password) === null;
  }

  private static getValidationErrors(password: string): string | null {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return null;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Password): boolean {
    if (!(other instanceof Password)) {
      return false;
    }
    return this.value === other.value;
  }
}
