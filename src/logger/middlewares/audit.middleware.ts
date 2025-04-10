import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from '../services/log.service';
import { AuditLogger } from '../loggers/audit.logger';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(
    private readonly logService: LogService,
    private readonly auditLogger: AuditLogger,
  ) {
    this.auditLogger.setContext('Request');
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logService.setRequest(req);
    this.logService.setUser({ host: req.headers['host'] });

    this.auditLogger.audit('Request started');

    res.on('finish', () => {
      this.auditLogger.audit('Request finished');
    });

    next();
  }
}
