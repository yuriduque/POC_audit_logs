/* eslint-disable @typescript-eslint/require-await */

import { DaprServer } from '@dapr/dapr';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DaprServerService implements OnModuleInit, OnModuleDestroy {
  private daprServer: DaprServer;

  async onModuleDestroy() {
    await this.daprServer.stop();

    console.log(`Dapr server stopped`);
  }

  async onModuleInit() {
    const daprHost = 'http://localhost';
    const daprPort = '3501';
    const serverHost = 'http://localhost';
    const serverPort = '5001';
    const pubSubName = 'orderpubsub';
    const pubSubTopic = 'orders';

    this.daprServer = new DaprServer({
      serverHost,
      serverPort,
      clientOptions: {
        daprHost,
        daprPort,
      },
      maxBodySizeMb: 50,
    });

    // Dapr subscription routes orders topic to this route
    this.daprServer.pubsub.subscribe(pubSubName, pubSubTopic, async data =>
      console.log('Subscriber received: ' + JSON.stringify(data)),
    );

    await this.daprServer.start();

    console.log(`Dapr server started`);
  }
}
