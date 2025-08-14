import { plainToInstance, Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  @IsOptional()
  DB_HOST: string = 'localhost';

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  POSTGRES_PORT: number = 5432;

  @IsString()
  @IsOptional()
  POSTGRES_USER: string = 'banking_user';

  @IsString()
  @IsOptional()
  POSTGRES_PASSWORD: string = 'banking_password';

  @IsString()
  @IsOptional()
  POSTGRES_DB: string = 'banking_system';

  @IsString()
  @IsOptional()
  JWT_SECRET: string = 'your-secret-key';

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsOptional()
  PORT: number = 3000;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
