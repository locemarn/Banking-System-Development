import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database-test',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'banking_test_user',
    password: process.env.DB_PASSWORD || 'test_password_123',
    database: process.env.DB_NAME || 'banking_test',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: true, // Always true for tests
    dropSchema: true, // Clean database for each test run
    logging: false, // Disable logging in tests
  }),
);
