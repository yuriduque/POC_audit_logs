import { Module } from '@nestjs/common';
import { EventHubService } from './eventhub.service';

@Module({
  providers: [EventHubService],
})
export class AppModule {}
