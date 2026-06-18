import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import type { Connection } from 'mongoose';

@Injectable()
export class HealthService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async check() {
    const mongoState = this.connection.readyState; // 1 = connected
    return {
      ok: mongoState === 1,
      mongo: {
        readyState: mongoState,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

