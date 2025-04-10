import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableShutdownHooks(); // necessário para o onModuleDestroy funcionar

  await app.listen(3000);
}
bootstrap();
