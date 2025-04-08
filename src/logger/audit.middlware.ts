import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogFileService } from './log-file.service';
import { LogService } from './log.service';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(
    private readonly logFileService: LogFileService,
    private readonly logService: LogService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logService.setUser({ host: req.headers['host'] });

    res.on('finish', () => {
      this.logFileService.closeStream();
      this.logService.removeUser();
    });

    next();
  }
}
