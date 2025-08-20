import { EventHubProducerClient } from '@azure/event-hubs';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class EventHubService implements OnModuleDestroy {
  private connectionString: string =
    process.env.EVENT_HUB_CONNECTION_STRING || '';
  private readonly eventHubName: string = process.env.EVENT_HUB_NAME || '';

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
    } catch (error: any) {
      console.error(`Error enviando evento:`, error);
      console.error(`Connection string: ${this.connectionString}`);
      console.error(`Event Hub name: ${this.eventHubName}`);
      throw new Error(`Error enviando evento a Event Hub: ${error.message}`);
    }
  }
}
