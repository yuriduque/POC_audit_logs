import { EventHubProducerClient } from '@azure/event-hubs';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class EventHubService implements OnModuleDestroy {
  private connectionString: string = process.env.CLIENT_CONNECTION_STRING || '';
  private readonly eventHubName: string =
    process.env.CLIENT_EVENT_HUB_NAME || '';

  private producerClient: EventHubProducerClient;

  constructor() {
    this.producerClient = new EventHubProducerClient(
      this.connectionString,
      this.eventHubName,
    );
  }

  async onModuleDestroy() {
    await this.producerClient.close();
  }

  async sendEvent(body: object) {
    try {
      const batch = await this.producerClient.createBatch();
      batch.tryAdd({ body });
      await this.producerClient.sendBatch(batch);
      console.log('Evento enviado:', body);
    } catch (error) {
      console.error('Error enviando evento:', error);
      throw new Error('Error enviando evento a Event Hub');
    }
  }
}
