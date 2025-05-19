import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { EventHubService } from './eventhub.service';

dotenv.config();

console.log('ENVS', process.env.CHECKPOINT_STORE_CONTAINER_NAME);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const service = app.get(EventHubService);
  service.subscribeToEvents();

  app.enableShutdownHooks();

  await app.listen(5002);
}

bootstrap();
