/* eslint-disable @typescript-eslint/require-await */
import { EventHubConsumerClient } from '@azure/event-hubs';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class EventHubService implements OnModuleDestroy {
  private connectionString: string =
    'Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;';
  private readonly eventHubName: string = 'audit';
  private readonly consumerGroup: string = 'audit_log';

  private readonly consumerClient: EventHubConsumerClient;

  constructor() {
    this.consumerClient = new EventHubConsumerClient(
      this.consumerGroup,
      this.connectionString,
      this.eventHubName,
    );
  }

  async onModuleDestroy() {
    await this.consumerClient.close();
    console.log('EventHubService is being destroyed');
  }

  subscribeToEvents() {
    this.consumerClient.subscribe({
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
