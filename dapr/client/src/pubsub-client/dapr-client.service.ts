import { DaprClient } from '@dapr/dapr';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createGzip } from 'zlib';
import { daprConfig } from './constants/dapr.constants';

@Injectable()
export class DaprClientService implements OnModuleInit {
  private daprClient: DaprClient;

  onModuleInit() {
    try {
      console.log('Initializing Dapr Client with configuration:', daprConfig);

      this.daprClient = new DaprClient({
        daprHost: daprConfig.daprHost,
        daprPort: daprConfig.daprPort,
        communicationProtocol: daprConfig.protocol,
        maxBodySizeMb: 10000000000,
      });

      console.log('Dapr Client initialized successfully.');
    } catch (error) {
      console.error(
        `Erro ao inicializar o cliente Dapr com a configuração ${JSON.stringify(daprConfig)}:`,
        error,
      );
      throw new Error('Erro ao inicializar o cliente Dapr');
    }
  }

  async publishEvent(event: any) {
    try {
      // Get the size of the original JSON event in bytes
      const originalEventSizeInBytes = Buffer.byteLength(JSON.stringify(event));
      // Convert the size to megabytes
      const originalEventSizeInMB = originalEventSizeInBytes / (1024 * 1024);

      console.log(`Original event size: ${originalEventSizeInMB} MB`);

      // const gzippedEvent = await this.gzipEvent(event);

      // // Get the size of the gzipped event in bytes
      // const gzippedEventSizeInBytes = gzippedEvent.length;

      // // Convert the size to megabytes
      // const gzippedEventSizeInMB = gzippedEventSizeInBytes / (1024 * 1024);

      // console.log(`Gzipped event size: ${gzippedEventSizeInMB} MB`);

      await this.daprClient.pubsub.publish('activity-log', '$Default', event);

      console.log(
        `Event published successfully to ${daprConfig.pubsub}/${daprConfig.topic}:`,
        originalEventSizeInMB,
      );
    } catch (error) {
      console.error(
        `Erro ao publicar evento para ${daprConfig.pubsub}/${daprConfig.topic}:`,
        error,
      );
    }
  }

  private gzipEvent(event: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const gzip = createGzip();
      const chunks: Buffer[] = [];

      gzip.on('data', chunk => chunks.push(chunk));
      gzip.on('end', () => resolve(Buffer.concat(chunks)));
      gzip.on('error', err => reject(err));

      gzip.write(JSON.stringify(event));
      gzip.end();
    });
  }
}
