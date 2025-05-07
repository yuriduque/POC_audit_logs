import { DaprServer } from '@dapr/dapr';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { daprConfig } from './constants/dapr.constants';
import { TypeDaprPubSubCallback } from '@dapr/dapr/types/DaprPubSubCallback.type';

@Injectable()
export class DaprServerService implements OnModuleInit {
  async onModuleInit() {
    try {
      const server = new DaprServer({
        serverHost: daprConfig.serverHost,
        serverPort: daprConfig.serverPort,
        communicationProtocol: daprConfig.protocol,
        clientOptions: {
          daprHost: daprConfig.daprHost,
          daprPort: daprConfig.daprPort,
        },
      });

      // eslint-disable-next-line @typescript-eslint/require-await
      const callback: TypeDaprPubSubCallback = async data => {
        console.log('Subscriber received: ' + JSON.stringify(data));
      };

      // Dapr subscription routes orders topic to this route
      await server.pubsub.subscribe(
        daprConfig.pubsub,
        daprConfig.topic,
        callback,
      );

      await server.start();
    } catch (error) {
      console.error('Erro ao inicializar o cliente Dapr:', error);
      throw new Error('Erro ao inicializar o cliente Dapr');
    }
  }
}
