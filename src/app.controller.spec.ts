import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return hello message', () => {
      expect(appController.getHello()).toBe('Banking System API is running!');
    });
  });

  describe('health', () => {
    it('should return health status', async () => {
      const result = await appController.getHealth();

      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('services');
      expect(result.services).toHaveProperty('api', 'running');
    });
  });
});
