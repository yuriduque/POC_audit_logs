import { Module } from '@nestjs/common';
import { EventHubService } from './eventhub.service';
import { AppController } from './event.controller';

@Module({
  controllers: [AppController],
  providers: [EventHubService],
  exports: [EventHubService],
})
export class AppModule {}
