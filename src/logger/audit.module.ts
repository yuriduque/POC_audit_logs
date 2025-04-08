import { Module, Scope } from '@nestjs/common';
import { AuditLogger } from './audit-logger';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
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
        level: 'warn',
      },
    }),
  ],
  providers: [AuditLogger],
  exports: [AuditLogger],
})
export class AuditModule {}
