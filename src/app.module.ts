import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaprController } from './dapr.controller';
import { DaprClientService } from './dapr-client.service';
import { DaprServerService } from './dapr-server.service';

@Module({
  imports: [],
  controllers: [AppController, DaprController],
  providers: [AppService, DaprClientService, DaprServerService],
})
export class AppModule {}
