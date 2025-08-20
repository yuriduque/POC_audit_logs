import { Controller, Post, Body } from '@nestjs/common';
import { DaprClientService } from './dapr-client.service';

@Controller('events')
export class DaprController {
  constructor(private readonly daprService: DaprClientService) {}

  @Post()
  async createEvent(@Body() event: any) {
    await this.daprService.publishEvent(event);
    return { message: 'Evento publicado com sucesso!' };
  }
}
