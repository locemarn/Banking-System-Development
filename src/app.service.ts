import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Banking System API is running!';
  }

  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: 'not_checked',
        api: 'running',
      },
      version: process.env.npm_package_version || '1.0.0',
    };
  }
}
