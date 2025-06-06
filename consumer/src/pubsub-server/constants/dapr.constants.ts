import { CommunicationProtocolEnum } from '@dapr/dapr';

interface DaprConfigs {
  daprHost: string;
  daprPort: string;
  serverHost: string;
  serverPort: string;
  pubsub: string;
  topic: string;
  protocol: CommunicationProtocolEnum;
}

export const daprConfig: DaprConfigs = {
  daprHost: 'localhost', // Dapr Sidecar Host
  daprPort: '3501', // Dapr Sidecar Port of this Example Server
  serverHost: 'localhost', // App Host of this Example Server
  serverPort: '5001', // App Port of this Example Server
  pubsub: 'orderpubsub', // PubSub name
  topic: 'orders', // Topic name
  protocol: CommunicationProtocolEnum.HTTP, // Communication Protocol
};
