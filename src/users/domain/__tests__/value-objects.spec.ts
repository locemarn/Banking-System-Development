import { InvalidCPFException } from '../exceptions/invalid-cpf.exception';
import { InvalidEmailException } from '../exceptions/invalid-email.exception';
import { InvalidPasswordException } from '../exceptions/invalid-password.exception';
import { CPF } from '../value-objects/cpf.value-object';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';

describe('Value Objects', () => {
  describe('Email Value Object', () => {
    describe('Basic functionality', () => {
      it('should create an email value object', () => {
        const email = Email.create('test@example.com');

        expect(email).toBeInstanceOf(Email);
        expect(email.toString()).toBe('test@example.com');
      });

      it('should throw InvalidEmailException for invalid email', () => {
        expect(() => {
          Email.create('invalid-email');
        }).toThrow(InvalidEmailException);
      });
    });

    describe('Edge Cases', () => {
      it('should handle null and undefined inputs', () => {
        expect(() => Email.create(null as any)).toThrow(InvalidEmailException);
        expect(() => Email.create(undefined as any)).toThrow(
          InvalidEmailException,
        );
      });

      it('should handle empty string', () => {
        expect(() => Email.create('')).toThrow(InvalidEmailException);
      });

      it('should handle non-string inputs', () => {
        expect(() => Email.create(123 as any)).toThrow(InvalidEmailException);
        expect(() => Email.create({} as any)).toThrow(InvalidEmailException);
        expect(() => Email.create([] as any)).toThrow(InvalidEmailException);
      });

      it('should normalize email (lowercase and trim)', () => {
        const email = Email.create('  TEST@EXAMPLE.COM  ');
        expect(email.toString()).toBe('test@example.com');
      });

      it('should handle emails with special characters', () => {
        const validSpecialEmails = [
          'user+tag@example.com',
          'user.name@example.com',
          'user_name@example.com',
          'user-name@example.com',
        ];

        validSpecialEmails.forEach((emailStr) => {
          expect(() => Email.create(emailStr)).not.toThrow();
        });
      });
    });

    describe('Immutability', () => {
      it('should not allow direct modification of internal state', () => {
        const email = Email.create('test@example.com');
        const originalValue = email.toString();

        // The value should remain unchanged even if we try to modify
        expect(email.toString()).toBe(originalValue);
      });

      it('should create new instances instead of modifying existing ones', () => {
        const email1 = Email.create('test1@example.com');
        const email2 = Email.create('test2@example.com');

        expect(email1.toString()).toBe('test1@example.com');
        expect(email2.toString()).toBe('test2@example.com');

        // They should be different instances
        expect(email1).not.toBe(email2);
      });

      it('should maintain immutability after multiple operations', () => {
        const email = Email.create('test@example.com');
        const originalValue = email.toString();

        // Perform various operations
        email.toString();
        email.equals(Email.create('other@example.com'));
        email.getDomain();
        email.getLocalPart();

        // Value should remain unchanged
        expect(email.toString()).toBe(originalValue);
      });
    });

    describe('Equality Checks', () => {
      it('should return true for equal emails', () => {
        const email1 = Email.create('test@example.com');
        const email2 = Email.create('test@example.com');

        expect(email1.equals(email2)).toBe(true);
      });

      it('should return true for emails with different casing (normalized)', () => {
        const email1 = Email.create('TEST@EXAMPLE.COM');
        const email2 = Email.create('test@example.com');

        expect(email1.equals(email2)).toBe(true);
      });

      it('should return false for different emails', () => {
        const email1 = Email.create('test1@example.com');
        const email2 = Email.create('test2@example.com');

        expect(email1.equals(email2)).toBe(false);
      });

      it('should return false when comparing with non-Email objects', () => {
        const email = Email.create('test@example.com');

        expect(email.equals('test@example.com' as any)).toBe(false);
        expect(email.equals(null as any)).toBe(false);
        expect(email.equals(undefined as any)).toBe(false);
      });

      it('should be reflexive (email equals itself)', () => {
        const email = Email.create('test@example.com');
        expect(email.equals(email)).toBe(true);
      });
    });

    describe('Additional methods', () => {
      it('should return correct domain part', () => {
        const email = Email.create('test@example.com');
        expect(email.getDomain()).toBe('example.com');
      });

      it('should return correct local part', () => {
        const email = Email.create('test@example.com');
        expect(email.getLocalPart()).toBe('test');
      });
    });
  });

  describe('CPF Value Object', () => {
    describe('Basic functionality', () => {
      it('should create a valid CPF', () => {
        const cpf = CPF.create('11144477735');
        expect(cpf).toBeInstanceOf(CPF);
        expect(cpf.toString()).toBe('11144477735');
      });

      it('should throw InvalidCPFException for invalid CPF', () => {
        expect(() => CPF.create('12345678901')).toThrow(InvalidCPFException);
      });
    });

    describe('Edge Cases', () => {
      it('should handle null and undefined inputs', () => {
        expect(() => CPF.create(null as any)).toThrow(InvalidCPFException);
        expect(() => CPF.create(undefined as any)).toThrow(InvalidCPFException);
      });

      it('should handle empty string', () => {
        expect(() => CPF.create('')).toThrow(InvalidCPFException);
      });

      it('should handle CPFs with all same digits', () => {
        const samedigitCPFs = ['11111111111', '22222222222', '00000000000'];
        samedigitCPFs.forEach((cpfStr) => {
          expect(() => CPF.create(cpfStr)).toThrow(InvalidCPFException);
        });
      });

      it('should normalize CPF by removing non-digits', () => {
        const cpf = CPF.create('111.444.777-35');
        expect(cpf.toString()).toBe('11144477735');
      });
    });

    describe('Immutability', () => {
      it('should not allow modification after creation', () => {
        const cpf = CPF.create('11144477735');
        const originalValue = cpf.toString();

        // Value should remain unchanged
        expect(cpf.toString()).toBe(originalValue);
      });
    });

    describe('Equality Checks', () => {
      it('should return true for equal CPFs', () => {
        const cpf1 = CPF.create('111.444.777-35');
        const cpf2 = CPF.create('11144477735');

        expect(cpf1.equals(cpf2)).toBe(true);
      });

      it('should return false for different CPFs', () => {
        const cpf1 = CPF.create('11144477735');
        const cpf2 = CPF.create('12345678909');

        expect(cpf1.equals(cpf2)).toBe(false);
      });
    });

    describe('Additional methods', () => {
      it('should return formatted CPF string', () => {
        const cpf = CPF.create('11144477735');
        expect(cpf.toFormattedString()).toBe('111.444.777-35');
      });
    });
  });

  describe('Password Value Object', () => {
    describe('Basic functionality', () => {
      it('should create a valid password', () => {
        const password = Password.create('Password123!');
        expect(password).toBeInstanceOf(Password);
        expect(password.toString()).toBe('Password123!');
      });

      it('should throw InvalidPasswordException for invalid password', () => {
        expect(() => Password.create('weak')).toThrow(InvalidPasswordException);
      });
    });

    describe('Edge Cases', () => {
      it('should handle passwords too short', () => {
        expect(() => Password.create('Short1!')).toThrow(
          InvalidPasswordException,
        );
      });

      it('should handle passwords without uppercase', () => {
        expect(() => Password.create('password123!')).toThrow(
          InvalidPasswordException,
        );
      });

      it('should handle passwords without lowercase', () => {
        expect(() => Password.create('PASSWORD123!')).toThrow(
          InvalidPasswordException,
        );
      });

      it('should handle passwords without numbers', () => {
        expect(() => Password.create('Password!')).toThrow(
          InvalidPasswordException,
        );
      });

      it('should handle passwords without special characters', () => {
        expect(() => Password.create('Password123')).toThrow(
          InvalidPasswordException,
        );
      });
    });

    describe('Immutability', () => {
      it('should not allow modification after creation', () => {
        const password = Password.create('MySecure@Pass1');
        const originalValue = password.toString();

        // Value should remain unchanged
        expect(password.toString()).toBe(originalValue);
      });
    });

    describe('Equality Checks', () => {
      it('should return true for identical passwords', () => {
        const password1 = Password.create('MySecure@Pass1');
        const password2 = Password.create('MySecure@Pass1');

        expect(password1.equals(password2)).toBe(true);
      });

      it('should return false for different passwords', () => {
        const password1 = Password.create('MySecure@Pass1');
        const password2 = Password.create('Different@Pass1');

        expect(password1.equals(password2)).toBe(false);
      });

      it('should be case-sensitive', () => {
        const password1 = Password.create('MySecure@Pass1');
        const password2 = Password.create('MySecure@PASS1');

        expect(password1.equals(password2)).toBe(false);
      });
    });
  });
});
