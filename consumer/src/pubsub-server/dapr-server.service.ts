/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { DaprServer } from '@dapr/dapr';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DaprServerService implements OnModuleInit {
  async onModuleInit() {
    const daprHost = 'http://localhost';
    const daprPort = '3501';
    const serverHost = 'http://localhost';
    const serverPort = '5001';
    const pubSubName = 'orderpubsub';
    const pubSubTopic = 'orders';

    const server = new DaprServer({
      serverHost,
      serverPort,
      clientOptions: {
        daprHost,
        daprPort,
      },
    });

    // Dapr subscription routes orders topic to this route
    server.pubsub.subscribe(pubSubName, pubSubTopic, async data =>
      console.log('Subscriber received: ' + JSON.stringify(data)),
    );

    await server.start();
  }
}
