import { Module } from '@nestjs/common';
import { EventHubService } from './eventhub.service';
import { AppController } from './event.controller';

@Module({
  controllers: [AppController],
  providers: [EventHubService],
})
export class AppModule {}
