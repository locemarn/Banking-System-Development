import { DomainException } from '../exceptions/domain.exception';
import { InvalidCPFException } from '../exceptions/invalid-cpf.exception';
import { InvalidEmailException } from '../exceptions/invalid-email.exception';
import { InvalidPasswordException } from '../exceptions/invalid-password.exception';

describe('Domain Exceptions', () => {
  describe('DomainException', () => {
    it('should be an abstract base class extending Error', () => {
      // We can't instantiate abstract class directly, so we test through subclass
      const exception = new InvalidEmailException('test@example.com');

      expect(exception).toBeInstanceOf(Error);
      expect(exception).toBeInstanceOf(DomainException);
    });

    it('should set the correct name property', () => {
      const exception = new InvalidEmailException('test@example.com');
      expect(exception.name).toBe('InvalidEmailException');
    });

    it('should capture stack trace', () => {
      const exception = new InvalidEmailException('test@example.com');
      expect(exception.stack).toBeDefined();
      expect(exception.stack).toContain('InvalidEmailException');
    });
  });

  describe('InvalidEmailException', () => {
    it('should create exception with correct message', () => {
      const email = 'invalid-email';
      const exception = new InvalidEmailException(email);

      expect(exception.message).toBe(`Invalid email format: ${email}`);
      expect(exception.name).toBe('InvalidEmailException');
    });

    it('should be instance of DomainException', () => {
      const exception = new InvalidEmailException('test');
      expect(exception).toBeInstanceOf(DomainException);
      expect(exception).toBeInstanceOf(Error);
    });
  });

  describe('InvalidCPFException', () => {
    it('should create exception with correct message', () => {
      const cpf = '12345678900';
      const exception = new InvalidCPFException(cpf);

      expect(exception.message).toBe(`Invalid cpf format: ${cpf}`);
      expect(exception.name).toBe('InvalidCPFException');
    });

    it('should be instance of DomainException', () => {
      const exception = new InvalidCPFException('test');
      expect(exception).toBeInstanceOf(DomainException);
      expect(exception).toBeInstanceOf(Error);
    });
  });

  describe('InvalidPasswordException', () => {
    it('should create exception with correct message', () => {
      const reason = 'Password too short';
      const exception = new InvalidPasswordException(reason);

      expect(exception.message).toBe(`Invalid password: ${reason}`);
      expect(exception.name).toBe('InvalidPasswordException');
    });

    it('should be instance of DomainException', () => {
      const exception = new InvalidPasswordException('test');
      expect(exception).toBeInstanceOf(DomainException);
      expect(exception).toBeInstanceOf(Error);
    });
  });

  describe('Exception handling in try-catch', () => {
    it('should be catchable as specific exception type', () => {
      expect(() => {
        throw new InvalidEmailException('test');
      }).toThrow(InvalidEmailException);
    });

    it('should be catchable as DomainException instance', () => {
      try {
        throw new InvalidEmailException('test');
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should be catchable as Error instance', () => {
      let caughtError: any;
      try {
        throw new InvalidEmailException('test');
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError).toBeInstanceOf(DomainException);
      expect(caughtError).toBeInstanceOf(InvalidEmailException);
    });

    it('should allow checking exception type in catch block', () => {
      try {
        throw new InvalidCPFException('123');
      } catch (error) {
        if (error instanceof InvalidCPFException) {
          expect(error.message).toContain('Invalid cpf format:');
        } else {
          fail('Should have caught InvalidCPFException');
        }
      }
    });
  });
});
