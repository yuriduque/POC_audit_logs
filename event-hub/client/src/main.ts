import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventHubService } from './eventhub.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const service = app.get(EventHubService);
  service.subscribeToEvents();

  app.enableShutdownHooks();

  await app.listen(5001);
}

bootstrap();
