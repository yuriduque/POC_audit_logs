// import { Controller, Get } from '@nestjs/common';
// import { DaprServerService } from './pubsub-server/dapr-server.service';

// @Controller('events')
// export class StartPubsubConsumerController {
//   constructor(private readonly daprService: DaprServerService) {}

//   @Get()
//   async createEvent() {
//     await this.daprService.start();

//     return { message: 'Todos os eventos foram consumidos com sucesso!' };
//   }
// }
