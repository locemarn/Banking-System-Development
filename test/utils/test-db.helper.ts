import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseTestConfig from '../../src/config/database-test.config';

export async function createTestingModule(
  imports: any[] = [],
  providers: any[] = [],
) {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [databaseTestConfig],
        isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
        useFactory: () => databaseTestConfig(),
      }),
      ...imports,
    ],
    providers,
  }).compile();

  return module;
}

export async function cleanDatabase(_module: TestingModule) {
  // Add database cleanup logic here when needed
  // For now, dropSchema: true in config handles this
  // The _module parameter is prefixed with underscore to indicate it's intentionally unused
}
