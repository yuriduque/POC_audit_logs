import { Module } from '@nestjs/common';
import { EventHubService } from './eventhub.service';

@Module({
  imports: [EventHubService],
})
export class AppModule {}
