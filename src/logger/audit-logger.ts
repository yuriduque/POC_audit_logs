import { Injectable, Scope } from '@nestjs/common';
import { LogService } from './log.service';

@Injectable({ scope: Scope.TRANSIENT })
export class AuditLogger {
  private context: string;

  constructor(private readonly logService: LogService) {}

  setContext(context: string) {
    this.context = context;
  }

  audit(message: string) {
    this.logService.create({
      level: 'audit',
      context: this.context,
      message,
    });
  }
}
