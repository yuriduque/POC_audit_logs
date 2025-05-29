import { Module } from '@nestjs/common';
import { DaprClientService } from './dapr-client.service';
import { DaprController } from './dapr.controller';

@Module({
  imports: [],
  controllers: [DaprController],
  providers: [DaprClientService],
})
export class PubsubClientModule {}
