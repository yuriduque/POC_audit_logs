import { Controller, Post, Body } from '@nestjs/common';
import { DaprService } from './dapr.service';

@Controller('events')
export class DaprController {
  constructor(private readonly daprService: DaprService) {}

  @Post()
  async createEvent(@Body() event: any) {
    await this.daprService.publishEvent(event);
    return { message: 'Evento publicado com sucesso!' };
  }
}
