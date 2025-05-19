import { EventHubProducerClient } from '@azure/event-hubs';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class EventHubService implements OnModuleDestroy {
  private connectionString: string = 'EVENT HUBS NAMESPACE CONNECTION STRING';
  private readonly eventHubName: string = 'audit';

  private producerClient: EventHubProducerClient;

  constructor() {
    this.producerClient = new EventHubProducerClient(
      this.connectionString,
      this.eventHubName,
    );
  }
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }

  async sendEvent(body: object) {
    const batch = await this.producerClient.createBatch();
    batch.tryAdd({ body });
    await this.producerClient.sendBatch(batch);
    console.log('Evento enviado:', body);
  }
}
