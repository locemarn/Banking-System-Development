/**
 * Test data factory for creating mock data
 * Add factory functions as you develop entities
 */

export function createMockUser(overrides: Partial<any> = {}) {
  return {
    id: 'test-user-id',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function createMockAccount(overrides: Partial<any> = {}) {
  return {
    id: 'test-account-id',
    accountNumber: '1234567890',
    balance: 1000.0,
    type: 'CHECKING',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function createMockTransaction(overrides: Partial<any> = {}) {
  return {
    id: 'test-transaction-id',
    amount: 100.0,
    type: 'DEPOSIT',
    description: 'Test transaction',
    createdAt: new Date(),
    ...overrides,
  };
}
