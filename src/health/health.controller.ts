import { Controller, Get, Query } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  // constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(@Query('test') test: string) {
    // this.healthService.getHealth(test);

    return { status: 'ok', test };
  }
}
