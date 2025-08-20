import { Module } from '@nestjs/common';
import { DaprSubscribeService } from './dapr-subscrive.service';
import { EventHubService } from './eventhub-publish.service';

@Module({
  providers: [DaprSubscribeService, EventHubService],
})
export class AppModule {}
