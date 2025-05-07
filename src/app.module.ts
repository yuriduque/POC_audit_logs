import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DaprController } from './dapr.controller';
import { DaprService } from './dapr.service';

@Module({
  imports: [],
  controllers: [AppController, DaprController],
  providers: [AppService, DaprService],
})
export class AppModule {}
