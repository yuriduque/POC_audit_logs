import { Module } from '@nestjs/common';
import { PubsubServerModule } from './pubsub-server/pubsub-server.module';
// import { StartPubsubConsumerController } from './start-pubsub-consumer.controller';

@Module({
  // controllers: [StartPubsubConsumerController],
  imports: [PubsubServerModule],
})
export class AppModule {}
