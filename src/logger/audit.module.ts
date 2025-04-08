import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuditLogger } from './audit-logger';
import { LogService } from './log.service';
import { AuditMiddleware } from './audit.middlware';
import { LogFileService } from './log-file.service';

@Module({
  imports: [],
  providers: [AuditLogger, LogService, LogFileService],
  exports: [AuditLogger],
})
export class AuditModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes('*');
  }
}
