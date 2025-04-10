import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuditLogger } from './loggers/audit.logger';
import { AuditMiddleware } from './middlewares/audit.middleware';
import { LogService } from './services/log.service';
import { LogFileService } from './services/log-file.service';

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
