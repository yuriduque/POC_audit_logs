import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AuditModule } from 'src/logger/audit.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [AuditModule, LoggerModule],
  controllers: [HealthController],
})
export class HealthModule {}
