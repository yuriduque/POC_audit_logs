import { Injectable } from '@nestjs/common';
import { AuditLogger } from 'src/logger/loggers/audit.logger';

@Injectable()
export class HealthService {
  constructor(private readonly auditLogger: AuditLogger) {
    this.auditLogger.setContext(HealthService.name);
  }

  getHealth(test: string) {
    this.auditLogger.audit(`AUDIT SERVICE 1 ${test}`);
    this.auditLogger.audit(`AUDIT SERVICE 2 ${test}`);
  }
}
