import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuditModule } from 'src/logger/audit.module';
import { HealthService } from './health.service';

@Module({
  imports: [AuditModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
