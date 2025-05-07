import { DaprClient } from '@dapr/dapr';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DaprService implements OnModuleInit {
  private daprClient: DaprClient;

  onModuleInit() {
    try {
      this.daprClient = new DaprClient({
        daprHost: 'localhost',
        daprPort: '3500',
      });
    } catch (error) {
      console.error('Erro ao inicializar o cliente Dapr:', error);
      throw new Error('Erro ao inicializar o cliente Dapr');
    }
  }

  async publishEvent(event: any) {
    try {
      await this.daprClient.pubsub.publish('pubsub', 'my-topic', event);
    } catch (error) {
      console.error('Erro ao publicar evento:', error);
      throw new Error('Erro ao publicar evento');
    }
  }
}
