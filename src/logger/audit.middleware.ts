import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly clsService: ClsService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const userAgent = req.headers['user-agent'];

    try {
      this.clsService.set('userAgent', userAgent);
    } catch (error) {
      console.error('Error setting CLS context:', error);
    }

    next();
  }
}
