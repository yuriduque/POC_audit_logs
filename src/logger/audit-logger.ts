import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuditLogger extends PinoLogger {
  constructor() {
    super({
      renameContext: 'AuditLoggerContext',
    });
  }

  audit(message: string) {
    this.info({ audit: true }, message);
  }
}
