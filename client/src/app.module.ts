import { Module } from '@nestjs/common';
import { DaprModule } from './dapr/dapr.module';

@Module({
  imports: [DaprModule],
})
export class AppModule {}
