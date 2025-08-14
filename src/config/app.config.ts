import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'banking-super-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
}));
