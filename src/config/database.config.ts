import { registerAs } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'banking_user',
    password: process.env.POSTGRES_PASSWORD || 'banking_password',
    database: process.env.POSTGRES_DB || 'banking_system',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    // ssl:
    //   process.env.NODE_ENV === 'production'
    //     ? { rejectUnauthorized: false }
    //     : false,
    dropSchema: process.env.NODE_ENV === 'test',
  }),
);
