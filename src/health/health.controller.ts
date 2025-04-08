import { Controller, Get } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { AuditLogger } from 'src/logger/audit-logger';

@Controller('health')
export class HealthController {
  constructor(
    private readonly auditLogger: AuditLogger,
    private readonly logger: PinoLogger,
  ) {
    this.auditLogger.setContext(HealthController.name);
  }

  @Get()
  getHealth() {
    this.auditLogger.audit('AUDIT LOG');

    this.logger.info('INFO LOG');
    return { status: 'ok' };
  }
}
