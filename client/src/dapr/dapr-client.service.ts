import { DaprClient } from '@dapr/dapr';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { daprConfig } from './constants/dapr.constants';

@Injectable()
export class DaprClientService implements OnModuleInit {
  private daprClient: DaprClient;

  constructor(
    private readonly pubsub: string,
    private readonly topic: string,
  ) {}

  onModuleInit() {
    try {
      console.log('Initializing Dapr Client with configuration:', daprConfig);

      this.daprClient = new DaprClient({
        daprHost: daprConfig.daprHost,
        daprPort: daprConfig.daprPort,
        communicationProtocol: daprConfig.protocol,
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
      await this.daprClient.pubsub.publish(this.pubsub, this.topic, event);

      console.log(
        `Event published successfully to ${daprConfig.pubsub}/${daprConfig.topic}:`,
        event,
      );
    } catch (error) {
      console.error(
        `Erro ao publicar evento para ${daprConfig.pubsub}/${daprConfig.topic}:`,
        error,
      );
    }
  }
}
