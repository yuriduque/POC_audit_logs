import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaprController } from './dapr.controller';
import { DaprClientService } from './dapr-client.service';

@Module({
  imports: [],
  controllers: [AppController, DaprController],
  providers: [AppService, DaprClientService],
})
export class AppModule {}
