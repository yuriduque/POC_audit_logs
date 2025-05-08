import { Module } from '@nestjs/common';
import { PubsubClientModule } from './pubsub-client/pubsub-client.module';

@Module({
  imports: [PubsubClientModule],
})
export class AppModule {}
