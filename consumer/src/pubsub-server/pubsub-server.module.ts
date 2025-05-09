import { Module } from '@nestjs/common';
import { DaprServerService } from './dapr-server.service';

@Module({
  providers: [DaprServerService],
  exports: [DaprServerService],
})
export class PubsubServerModule {}
