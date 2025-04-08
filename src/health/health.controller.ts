import { Controller, Get } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { AuditLogger } from 'src/logger/audit-logger';

@Controller('health')
export class HealthController {
  constructor(private readonly auditLogger: AuditLogger) {
    this.auditLogger.setContext(HealthController.name);
  }

  @Get()
  getHealth() {
    this.auditLogger.audit('AUDIT 1');
    this.auditLogger.audit('AUDIT 2');
    this.auditLogger.audit('AUDIT 3');
    this.auditLogger.audit('AUDIT 4');
    return { status: 'ok' };
  }
}
