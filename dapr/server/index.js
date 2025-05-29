import { DaprServer } from "@dapr/dapr";

const daprHost = "http://localhost";
const daprPort = "3501";
const serverHost = "http://localhost"
const serverPort = 5001;
const pubSubName = "activity-log-dapr";
const pubSubTopic = "activity-log";

async function main() {
  const server = new DaprServer({
    serverHost,
    serverPort,
    clientOptions: {
      daprHost,
      daprPort,
    },
  });

  // Dapr subscription routes orders topic to this route
  server.pubsub.subscribe(pubSubName, pubSubTopic, data =>
    console.log("Subscriber received: " + JSON.stringify(data))
  );

  await server.start();
}

main().catch(e => console.error(e));
