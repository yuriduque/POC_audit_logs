import { Module } from '@nestjs/common';
import { EventHubService } from './eventhub.service';
import { CheckpointStoreService } from './checkpoint.service';

@Module({
  providers: [EventHubService, CheckpointStoreService],
})
export class AppModule {}
