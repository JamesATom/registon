import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MongooseHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongooseHealth: MongooseHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Check that MongoDB is up
      () => this.mongooseHealth.pingCheck('mongodb'),
      
      // Optional: Check disk usage
      () => this.disk.checkStorage('storage', { 
        path: '/', 
        thresholdPercent: 0.9,
      }),
      
      // Optional: Check memory usage
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      
      // Check that our API is responding
      () => this.http.pingCheck('self-check', 'http://localhost:3000/api'),
    ]);
  }
}
