import { InvalidCPFException } from '../exceptions/invalid-cpf.exception';
import { InvalidEmailException } from '../exceptions/invalid-email.exception';
import { InvalidPasswordException } from '../exceptions/invalid-password.exception';
import { CPF } from '../value-objects/cpf.value-object';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';

describe('Value Objects Integration Tests', () => {
  describe('User Registration Data Validation', () => {
    it('should validate complete user registration data successfully', () => {
      // Simulate real user registration data
      const userData = {
        email: 'user@example.com',
        cpf: '111.444.777-35',
        password: 'SecurePass123!',
      };

      // Create all value objects
      const email = Email.create(userData.email);
      const cpf = CPF.create(userData.cpf);
      const password = Password.create(userData.password);

      // Verify all objects are created successfully
      expect(email.toString()).toBe('user@example.com');
      expect(cpf.toString()).toBe('11144477735');
      expect(cpf.toFormattedString()).toBe('111.444.777-35');
      expect(password.toString()).toBe('SecurePass123!');
    });

    it('should handle mixed case and formatting in user input', () => {
      // Simulate user input with various formatting
      const userData = {
        email: '  USER@EXAMPLE.COM  ',
        cpf: '111 444 777 35',
        password: 'MyStrongPass2024!',
      };

      const email = Email.create(userData.email);
      const cpf = CPF.create(userData.cpf);
      const password = Password.create(userData.password);

      // Verify normalization
      expect(email.toString()).toBe('user@example.com');
      expect(cpf.toString()).toBe('11144477735');
      expect(password.toString()).toBe('MyStrongPass2024!');
    });

    it('should reject invalid user registration data', () => {
      const invalidData = [
        {
          email: 'invalid-email',
          cpf: '111.444.777-35',
          password: 'SecurePass123!',
          expectedError: InvalidEmailException,
        },
        {
          email: 'user@example.com',
          cpf: '111.444.777-36', // Invalid check digit
          password: 'SecurePass123!',
          expectedError: InvalidCPFException,
        },
        {
          email: 'user@example.com',
          cpf: '111.444.777-35',
          password: 'weak', // Too weak
          expectedError: InvalidPasswordException,
        },
      ];

      invalidData.forEach(({ email, cpf, password, expectedError }) => {
        expect(() => {
          Email.create(email);
          CPF.create(cpf);
          Password.create(password);
        }).toThrow(expectedError);
      });
    });
  });

  describe('Value Object Combinations', () => {
    it('should create multiple instances without interference', () => {
      // Create multiple users' data
      const users = [
        {
          email: 'user1@example.com',
          cpf: '111.444.777-35',
          password: 'Password123!',
        },
        {
          email: 'user2@domain.com',
          cpf: '123.456.789-09',
          password: 'SecurePass456@',
        },
      ];

      const userObjects = users.map((userData) => ({
        email: Email.create(userData.email),
        cpf: CPF.create(userData.cpf),
        password: Password.create(userData.password),
      }));

      // Verify each user's data is independent
      expect(userObjects[0].email.toString()).toBe('user1@example.com');
      expect(userObjects[0].cpf.toString()).toBe('11144477735');
      expect(userObjects[1].email.toString()).toBe('user2@domain.com');
      expect(userObjects[1].cpf.toString()).toBe('12345678909');

      // Verify objects are different instances
      expect(userObjects[0].email).not.toBe(userObjects[1].email);
      expect(userObjects[0].cpf).not.toBe(userObjects[1].cpf);
      expect(userObjects[0].password).not.toBe(userObjects[1].password);
    });

    it('should handle equality comparisons across different scenarios', () => {
      // Same user data in different formats
      const email1 = Email.create('user@example.com');
      const email2 = Email.create('USER@EXAMPLE.COM');
      const cpf1 = CPF.create('111.444.777-35');
      const cpf2 = CPF.create('11144477735');
      const password1 = Password.create('SecurePass123!');
      const password2 = Password.create('SecurePass123!');

      // Test equality
      expect(email1.equals(email2)).toBe(true);
      expect(cpf1.equals(cpf2)).toBe(true);
      expect(password1.equals(password2)).toBe(true);

      // Test inequality
      const differentEmail = Email.create('other@example.com');
      const differentCpf = CPF.create('123.456.789-09');
      const differentPassword = Password.create('DifferentPass123!');

      expect(email1.equals(differentEmail)).toBe(false);
      expect(cpf1.equals(differentCpf)).toBe(false);
      expect(password1.equals(differentPassword)).toBe(false);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle Brazilian CPF validation with real examples', () => {
      // Valid Brazilian CPFs (these are test CPFs, not real people)
      const validCPFs = ['111.444.777-35', '123.456.789-09', '000.000.001-91'];

      validCPFs.forEach((cpfString) => {
        expect(() => CPF.create(cpfString)).not.toThrow();
        const cpf = CPF.create(cpfString);
        expect(cpf.toFormattedString()).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
      });
    });

    it('should handle international email formats', () => {
      const internationalEmails = [
        'user@example.com',
        'test.email+tag@domain.co.uk',
        'user_name@subdomain.example.org',
        'firstname.lastname@company-name.com',
      ];

      internationalEmails.forEach((emailString) => {
        expect(() => Email.create(emailString)).not.toThrow();
        const email = Email.create(emailString);
        expect(email.toString()).toBe(emailString.toLowerCase());
        expect(email.getDomain()).toContain('.');
        expect(email.getLocalPart()).toBeTruthy();
      });
    });

    it('should handle various password strength scenarios', () => {
      const passwordScenarios = [
        {
          password: 'SimplePass123!',
          description: 'basic strong password',
        },
        {
          password: 'VeryComplexPassword2024@#$',
          description: 'very complex password',
        },
        {
          password: 'Short1!@',
          description: 'minimum length password',
        },
      ];

      passwordScenarios.forEach(({ password, description }) => {
        expect(() => Password.create(password)).not.toThrow();
        const passwordObj = Password.create(password);
        expect(passwordObj.toString()).toBe(password);
      });
    });

    it('should handle edge cases in combination', () => {
      // Test edge cases that might occur in real applications
      const edgeCases = [
        {
          email: 'a@b.co', // Shortest valid email
          cpf: '000.000.001-91', // Edge case CPF
          password: 'MinPass1!', // Minimum valid password
        },
      ];

      edgeCases.forEach(({ email, cpf, password }) => {
        expect(() => {
          const emailObj = Email.create(email);
          const cpfObj = CPF.create(cpf);
          const passwordObj = Password.create(password);

          // Verify they work together
          expect(emailObj.toString()).toBe(email.toLowerCase());
          expect(cpfObj.toFormattedString()).toMatch(
            /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          );
          expect(passwordObj.toString()).toBe(password);
        }).not.toThrow();
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('should provide clear error messages for validation failures', () => {
      const invalidInputs = [
        {
          type: 'email',
          value: 'not-an-email',
          create: () => Email.create('not-an-email'),
          expectedMessage: 'Invalid email format: not-an-email',
        },
        {
          type: 'cpf',
          value: '123.456.789-00',
          create: () => CPF.create('123.456.789-00'),
          expectedMessage: 'Invalid CPF: 123.456.789-00',
        },
        {
          type: 'password',
          value: 'weak',
          create: () => Password.create('weak'),
          expectedMessage:
            'Invalid password: Password must be at least 8 characters long',
        },
      ];

      invalidInputs.forEach(({ type, value, create, expectedMessage }) => {
        try {
          create();
          fail(`Expected ${type} validation to throw an error`);
        } catch (error: any) {
          expect(error.message).toBe(expectedMessage);
        }
      });
    });

    it('should handle null and undefined consistently across all value objects', () => {
      const nullUndefinedTests = [
        { create: () => Email.create(null as any), type: 'Email' },
        { create: () => Email.create(undefined as any), type: 'Email' },
        { create: () => CPF.create(null as any), type: 'CPF' },
        { create: () => CPF.create(undefined as any), type: 'CPF' },
        { create: () => Password.create(null as any), type: 'Password' },
        { create: () => Password.create(undefined as any), type: 'Password' },
      ];

      nullUndefinedTests.forEach(({ create, type }) => {
        expect(create).toThrow();
      });
    });
  });

  describe('Performance and Memory', () => {
    it('should handle creating many value objects efficiently', () => {
      const startTime = Date.now();
      const objects: any[] = [];

      // Create many value objects
      for (let i = 0; i < 1000; i++) {
        objects.push({
          email: Email.create(`user${i}@example.com`),
          cpf: CPF.create('111.444.777-35'),
          password: Password.create(`Password${i}!`),
        });
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete reasonably quickly (adjust threshold as needed)
      expect(duration).toBeLessThan(1000); // Less than 1 second
      expect(objects).toHaveLength(1000);

      // Verify first and last objects are correct
      expect(objects[0].email.toString()).toBe('user0@example.com');
      expect(objects[999].email.toString()).toBe('user999@example.com');
    });

    it('should maintain immutability under stress', () => {
      const email = Email.create('test@example.com');
      const cpf = CPF.create('111.444.777-35');
      const password = Password.create('TestPass123!');

      const originalEmail = email.toString();
      const originalCpf = cpf.toString();
      const originalPassword = password.toString();

      // Perform many operations
      for (let i = 0; i < 100; i++) {
        email.toString();
        email.getDomain();
        email.getLocalPart();
        email.equals(Email.create('other@example.com'));

        cpf.toString();
        cpf.toFormattedString();
        cpf.equals(CPF.create('123.456.789-09'));

        password.toString();
        password.equals(Password.create('OtherPass123!'));
      }

      // Values should remain unchanged
      expect(email.toString()).toBe(originalEmail);
      expect(cpf.toString()).toBe(originalCpf);
      expect(password.toString()).toBe(originalPassword);
    });
  });
});
