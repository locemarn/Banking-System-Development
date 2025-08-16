import { InvalidEmailException } from '../exceptions/invalid-email.exception';

export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    if (!email || typeof email !== 'string') {
      throw new InvalidEmailException(email);
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!Email.isValid(normalizedEmail)) {
      throw new InvalidEmailException(email);
    }

    return new Email(normalizedEmail);
  }

  private static isValid(email: string): boolean {
    // Comprehensive email validation regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Additional validations
    if (email.length > 254) return false; // RFC 5321 limit
    if (email.startsWith('.') || email.endsWith('.')) return false;
    if (email.includes('..')) return false; // No consecutive dots

    return emailRegex.test(email);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    if (!(other instanceof Email)) {
      return false;
    }
    return this.value === other.value;
  }

  /**
   * Returns the domain part of the email
   * @returns The domain part (after @)
   */
  getDomain(): string {
    return this.value.split('@')[1];
  }

  /**
   * Returns the local part of the email
   * @returns The local part (before @)
   */
  getLocalPart(): string {
    return this.value.split('@')[0];
  }
}
