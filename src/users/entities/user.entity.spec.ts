import { User, UserRole, UserStatus } from './user.entity';

describe('User Entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.cpf = '12345678900';
    user.firstName = 'FirstName';
    user.lastName = 'LastName';
    user.email = 'test@email.com';
    user.password = 'hasedpassword123';
    user.role = UserRole.ADMIN;
    user.status = UserStatus.ACTIVE;
    user.emailVerified = true;
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });

  describe('User Create', () => {
    it('Should create a valid user with all required fields', () => {
      expect(user).toBeInstanceOf(User);
      // console.log('--->', user);
      // expect(user.cpf).toBe(userData.cpf);
      // expect(user.email).toBe(userData.email);
      // expect(user.createdAt).toBeInstanceOf(Date);
    });
  });
});
