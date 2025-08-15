import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return hello message', () => {
    expect(service.getHello()).toBe('Banking System API is running!');
  });

  it('should return health status', async () => {
    const health = await service.getHealth();

    expect(health).toHaveProperty('status', 'ok');
    expect(health).toHaveProperty('timestamp');
    expect(health).toHaveProperty('services');
    expect(health.services).toHaveProperty('api', 'running');
    expect(health).toHaveProperty('version');
  });
});
