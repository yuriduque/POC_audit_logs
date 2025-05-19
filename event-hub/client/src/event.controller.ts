import { Body, Controller, Post } from '@nestjs/common';
import { EventHubService } from './eventhub.service';

@Controller('events')
export class AppController {
  constructor(private readonly eventHubService: EventHubService) {}

  @Post()
  async sendEvent(@Body() body: object) {
    await this.eventHubService.sendEvent(body);
    return { message: 'Evento enviado com sucesso!' };
  }
}
