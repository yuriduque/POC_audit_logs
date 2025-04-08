import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuditModule } from './logger/audit.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
            },
            {
              target:
                '/Users/yurid/Documents/flow/POC_audit_logs/src/logger/audit-logger.transport.ts',
              options: {
                auditDestination:
                  '/Users/yurid/Documents/flow/POC_audit_logs/logs/audit.log',
              },
            },
          ],
        },
      },
    }),
    AuditModule,
    HealthModule,
  ],
})
export class AppModule {}
