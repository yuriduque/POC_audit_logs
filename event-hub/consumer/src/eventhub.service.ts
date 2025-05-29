/* eslint-disable @typescript-eslint/require-await */
import { EventHubConsumerClient, Subscription } from '@azure/event-hubs';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { CheckpointStoreService } from './checkpoint.service';

@Injectable()
export class EventHubService implements OnModuleDestroy {
  private connectionString: string =
    process.env.CONSUMER_CONNECTION_STRING || '';
  private readonly eventHubName: string =
    process.env.CONSUMER_EVENT_HUB_NAME || '';
  private readonly consumerGroup: string = process.env.CONSUMER_GROUP || '';

  private consumerClient: EventHubConsumerClient;
  private subscription: Subscription | undefined;

  constructor(
    private readonly checkpointStoreService: CheckpointStoreService,
  ) {}

  async createConsumerClient() {
    const checkPointStore = await this.checkpointStoreService.create();

    this.consumerClient = new EventHubConsumerClient(
      this.consumerGroup,
      this.connectionString,
      this.eventHubName,
      checkPointStore,
    );
  }

  async onModuleDestroy() {
    if (this.subscription) {
      await this.subscription.close();
      console.log('Subscription closed');
    }
    await this.consumerClient.close();
    console.log('Consumer client closed');
  }

  async subscribeToEvents() {
    if (!this.consumerClient) {
      await this.createConsumerClient();
    }

    this.subscription = this.consumerClient.subscribe({
      processEvents: async (events, context) => {
        if (events.length === 0) {
          console.log(
            `No events received within wait time. Waiting for next interval`,
          );
          return;
        }

        for (const event of events) {
          console.log(
            `Received event: '${JSON.stringify(event.body)}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`,
          );
        }

        await context.updateCheckpoint(events[events.length - 1]);
      },
      processError: async err => {
        console.error(`Error occurred: ${err.message}`);
      },
      processInitialize: async context => {
        console.log(
          `Initializing subscription for partition: ${context.partitionId} and consumer group: ${context.consumerGroup}`,
        );
      },
      processClose: async () => {
        console.log(`Closing subscription`);
      },
    });
  }
}
