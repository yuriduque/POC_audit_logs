import { DaprServer } from '@dapr/dapr';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EventHubService } from './eventhub-publish.service';

@Injectable()
export class DaprSubscribeService implements OnModuleInit, OnModuleDestroy {
  private daprServer: DaprServer;
  private daprHost: string;
  private daprPort: string;
  private serverHost: string;
  private serverPort: string;
  private pubSubName: string;
  private pubSubTopic: string;

  constructor(private readonly eventHubService: EventHubService) {
    this.daprHost = process.env.DAPR_HOST || 'localhost';
    this.daprPort = process.env.DAPR_PORT || '3500';
    this.serverHost = process.env.DAPR_SERVER_HOST || 'localhost';
    this.serverPort = process.env.DAPR_SERVER_PORT || '5001';
    this.pubSubName = process.env.DAPR_PUBSUB_NAME || 'activity-log-dapr';
    this.pubSubTopic = process.env.DAPR_PUBSUB_TOPIC || 'activity-log';
  }

  async onModuleDestroy() {
    await this.daprServer.stop();
    console.log(`Dapr server stopped`);
  }

  async onModuleInit() {
    this.daprServer = new DaprServer({
      serverHost: this.serverHost,
      serverPort: this.serverPort,
      clientOptions: {
        daprHost: this.daprHost,
        daprPort: this.daprPort,
      },
      maxBodySizeMb: 50,
    });

    this.daprServer.pubsub.subscribe(
      this.pubSubName,
      this.pubSubTopic,
      async data => {
        try {
          console.log('Subscriber received: ' + JSON.stringify(data));

          // Forward the received data to Event Hub
          await this.eventHubService.sendEvent(data);
          console.log('Event successfully forwarded to Event Hub');
        } catch (error) {
          console.error('Error forwarding event to Event Hub:', error);
        }
      },
    );

    await this.daprServer.start();

    console.log(`Dapr server started`);
  }
}
